import { async, TestBed } from '@angular/core/testing';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { PartOfSpeech } from '@shared/enums/part-of-speech.enum';
import { GoogleDefineResponse } from '@shared/interfaces/googledictionaryapi/google-define-response.interface';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { DefinitionService } from '@word/services/definition.service';
import { GetDefintions } from '@word/state/definition/definition.actions';
import { DefinitionState } from '@word/state/definition/definition.state';
import { Observable, of } from 'rxjs';

const definitionServiceSpy =
  jasmine.createSpyObj('DefinitionService', ['getDefinitions']);

describe('Defintion actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([DefinitionState]),
        NgxsLoggerPluginModule.forRoot({
          collapsed: true
        }),
      ],
      providers: [
        { provide: DefinitionService, useValue: definitionServiceSpy }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should call an api and store definitons', () => {
    const stubValue: Observable<GoogleDefineResponse> = of({ word: 'test-word', meaning: { noun: [{ definition: 'test-definition', example: 'test-example' }] } });
    definitionServiceSpy.getDefinitions.and.returnValue(stubValue);

    const expected: { [word: string]: WordDefinition[] } = { 'test-word': [{ definition: 'test-definition', partOfSpeech: PartOfSpeech.NOUN }] };

    store.dispatch(new GetDefintions('test-word')).subscribe(() => {
      store.select(state => state.definition.definitions).subscribe((definitions: { [word: string]: WordDefinition[] }) => {
        expect(definitions).toEqual(expected);
      });
    });

  });

});
