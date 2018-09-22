import { async, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxsModule, Store } from '@ngxs/store';
import { AddedWord } from '@word/word-master/state/word-master.actions';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { BehaviorSubject, of } from 'rxjs';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

const AngularFireMocks = {
  user: of(false)
};

describe('App actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([WordMasterState])],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: AngularFireMocks }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new AddedWord({ word: 'test', id: null, starred: false }));
    store.select(state => state.wordmaster.words).subscribe((words: string[]) => {
      expect(words).toEqual(jasmine.objectContaining([{ word: 'test', id: null }]));
    });
  });

});
