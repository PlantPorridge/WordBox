import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { WordAddComponent } from '@word/word-add/word-add.component';
import { WordItemComponent } from '@word/word-item/word-item.component';
import { WordListComponent } from '@word/word-list/word-list.component';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { WordMasterComponent } from './word-master.component';


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
      declarations: [WordMasterComponent, WordListComponent, WordAddComponent, WordItemComponent]
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
