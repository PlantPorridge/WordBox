import { Action, Selector, State, StateContext } from '@ngxs/store';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { AddWordAction, GetWordsAction } from '@word/word-master/state/word-master.actions';

export class AppStateModel {
  public words: WordItem[];
}

@State<AppStateModel>({
  name: 'wordmaster',
  defaults: {
    words: []
  }
})
export class WordMasterState {

  @Selector() static words(state: AppStateModel) {
    return state.words;
  }

  @Action(GetWordsAction)
  GetWordsAction(ctx: StateContext<AppStateModel>, action: GetWordsAction) {
    //TODO: Replace with API call
    let loadedWords: WordItem[] = [
      { word: "One" },
      { word: "Two" },
      { word: "Three" }
    ];

    ctx.setState({ words: [...loadedWords] });
  }

  @Action(AddWordAction)
  AddWordAction(ctx: StateContext<AppStateModel>, action: AddWordAction) {
    const state = ctx.getState();
    ctx.setState({ words: [action.newWord, ...state.words] });
  }
}
