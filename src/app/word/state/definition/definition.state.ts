import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { DefinitionService } from '@word/services/definition.service';
import { GetDefintions } from '@word/state/definition/definition.actions';
import { UpdateWord } from '@word/word-master/state/word-master.actions';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class DefinitionStateModel {
  public definitions: { [word: string]: WordDefinition[] };
}

@State<DefinitionStateModel>({
  name: 'definition',
  defaults: {
    definitions: {}
  }
})
export class DefinitionState {

  @Selector() static getWordDefinitionsFn(state: DefinitionStateModel) {
    return (word: string) => state.definitions[word];
  }

  constructor(
    private store: Store,
    private definitionService: DefinitionService,
  ) { }

  @Action(GetDefintions)
  GetDefintions(ctx: StateContext<DefinitionStateModel>, action: GetDefintions) {

    return this.definitionService.getDefinitions(action.word).pipe(
      map(meanings => {
        return DefinitionService.responseToDefine(meanings)
      }),
      tap((definitions) => {
        const state = ctx.getState();
        ctx.setState({ definitions: Object.assign({}, state.definitions, { [action.word]: definitions }) });

        if (definitions) {
          let word = this.store.selectSnapshot(WordMasterState.word(action.word));
          this.store.dispatch(new UpdateWord({ ...word, definitions }));
        }
      }),
      catchError((err) => {
        console.warn("Lookup Failed:", err);
        const state = ctx.getState();
        ctx.setState({ definitions: Object.assign({}, state.definitions, { [action.word]: [] }) });
        return of(null);
      })
    );
  }

}
