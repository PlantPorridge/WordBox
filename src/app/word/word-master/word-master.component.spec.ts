import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { WordAddComponent } from '@word/word-add/word-add.component';
import { WordCardComponent } from '@word/word-card/word-card.component';
import { WordDefinitionListComponent } from '@word/word-definition-list/word-definition-list.component';
import { WordDefinitionComponent } from '@word/word-definition/word-definition.component';
import { WordListComponent } from '@word/word-list/word-list.component';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { BehaviorSubject } from 'rxjs';
import { WordMasterComponent } from './word-master.component';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

const FireAuthStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('WordMasterComponent', () => {
  let component: WordMasterComponent;
  let fixture: ComponentFixture<WordMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([
          WordMasterState
        ])
      ],
      declarations: [
        WordMasterComponent,
        WordListComponent,
        WordAddComponent,
        WordCardComponent,
        WordDefinitionListComponent,
        WordDefinitionComponent
      ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FireAuthStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
