import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordMasterComponent } from './word-master.component';

describe('WordMasterComponent', () => {
  let component: WordMasterComponent;
  let fixture: ComponentFixture<WordMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordMasterComponent ]
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
