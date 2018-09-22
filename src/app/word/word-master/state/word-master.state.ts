import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { WordService } from '@word/services/word.service';
import { AddedWord, AddWord, ModifiedWord, QueryWords,
  RemovedWord, RemoveWord, Success, UpdateWord } from '@word/word-master/state/word-master.actions';
import { map, mergeMap, take, tap } from 'rxjs/operators';

export class AppStateModel {
  public words: WordItem[];
}

@State<AppStateModel>({
  name: 'wordmaster',
  defaults: {
    words: []
  }
})
export class WordMasterState implements NgxsOnInit {

  private uid: string;

  @Selector() static words(state: AppStateModel) {
    return state.words;
  }

  constructor(
    private wordService: WordService,
    private afAuth: AngularFireAuth
  ) { }

  ngxsOnInit(ctx?: StateContext<any>) {
    // Hack for testing
    if (!this.afAuth.user) {
      return;
    }

    this.afAuth.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        ctx.dispatch(new QueryWords(user.uid));
      }
    });
  }

  @Action(QueryWords, { cancelUncompleted: true })
  QueryWords(ctx: StateContext<AppStateModel>, action: QueryWords) {
    return this.wordService.queryWords(action.uid).pipe(
      mergeMap(dcActions => dcActions),
      tap((dcAction: DocumentChangeAction<WordItem>) => {
        const word = WordService.actionToWordItem(dcAction);
        switch (dcAction.type) {
          case 'added':
            ctx.dispatch(new AddedWord(word));
            break;
          case 'removed':
            ctx.dispatch(new RemovedWord(word));
            break;
          case 'modified':
            ctx.dispatch(new ModifiedWord(word));
            break;
        }
      })
    );
  }

  @Action(AddedWord)
  AddedWord(ctx: StateContext<AppStateModel>, action: AddedWord) {
    const state = ctx.getState();
    ctx.setState({ words: [action.word, ...state.words] });
  }

  @Action(RemovedWord)
  RemovedWord(ctx: StateContext<AppStateModel>, action: RemovedWord) {
    const state = ctx.getState();

    const index = state.words.map(w => w.id).indexOf(action.word.id);

    ctx.setState({
      words: [
        ...state.words.slice(0, index),
        ...state.words.slice(index + 1)
      ]
    });
  }

  @Action(ModifiedWord)
  ModifiedWord(ctx: StateContext<AppStateModel>, action: ModifiedWord) {
    const state = ctx.getState();

    const actionIndex = state.words.map(w => w.id).indexOf(action.word.id);

    ctx.patchState({
      words: state.words.map((word, index) => {
        if (index !== actionIndex) {
          return word;
        }

        return {
          ...word,
          ...action.word
        };
      })
    });
  }

  @Action(AddWord)
  AddWord(ctx: StateContext<AppStateModel>, action: AddWord) {
    this.wordService.addWord(this.uid, action.word).pipe(
      map(() => {
        return ctx.dispatch(new Success());
      })
    );
  }

  @Action(RemoveWord)
  RemoveWord(ctx: StateContext<AppStateModel>, action: RemoveWord) {
    return this.wordService.removeWord(this.uid, action.word).pipe(
      map(() => {
        return ctx.dispatch(new Success());
      })
    );
  }

  @Action(UpdateWord)
  UpdateWord(ctx: StateContext<AppStateModel>, action: UpdateWord) {
    return this.wordService.updateWord(this.uid, action.word).pipe(
      map(() => {
        return ctx.dispatch(new Success());
      })
    );
  }

  @Action(Success)
  Success(ctx: StateContext<AppStateModel>, action: Success) {

  }

}
