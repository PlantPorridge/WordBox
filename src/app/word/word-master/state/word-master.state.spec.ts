import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AddWordAction } from '@word/word-master/state/word-master.actions';
import { WordMasterState } from '@word/word-master/state/word-master.state';

describe('App actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([WordMasterState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new AddWordAction({ word: "test" }));
    store.select(state => state.wordmaster.words).subscribe((words: string[]) => {
      expect(words).toEqual(jasmine.objectContaining([{ word: "test" }]));
    });
  });

});
