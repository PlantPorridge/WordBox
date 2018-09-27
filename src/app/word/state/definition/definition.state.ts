import { Action, Selector, State, StateContext } from '@ngxs/store';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { DefinitionService } from '@word/services/definition.service';
import { GetDefintions } from '@word/state/definition/definition.actions';
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
    private definitionService: DefinitionService,
  ) { }

  @Action(GetDefintions)
  GetDefintions(ctx: StateContext<DefinitionStateModel>, action: GetDefintions) {
    console.log(this.definitionService.getDefinitions(action.word))
    return this.definitionService.getDefinitions(action.word).pipe(
      map(meanings => {
        return DefinitionService.responseToDefine(meanings)
      }),
      tap((definitions) => {
        const state = ctx.getState();
        ctx.setState({ definitions: Object.assign({}, state.definitions, { [action.word]: definitions }) });
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
