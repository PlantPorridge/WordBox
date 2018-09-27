import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PartOfSpeech } from '@shared/enums/part-of-speech.enum';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { WordDefinitionComponent } from './word-definition.component';

@Component({
  template: `
    <app-word-definition [definition]="definition" (selected)="definitionSelected($event)">
    </app-word-definition>`
})
class TestHostComponent {
  definition: WordDefinition = { definition: '', partOfSpeech: null };
  selectedDefinition: WordDefinition;
  definitionSelected(definition: WordDefinition) {
    this.selectedDefinition = definition;
  }
}

describe('WordDefinitionComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let wrapperDe: DebugElement;
  let definitionEle: HTMLElement;
  let partOfSpeechEle: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordDefinitionComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);

    component = fixture.componentInstance;

    wrapperDe = fixture.debugElement.query(By.css('.definition__wrapper'));
    definitionEle = fixture.nativeElement.querySelector('.word__definition');
    partOfSpeechEle = fixture.nativeElement.querySelector('.word__part-of-speech');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no description after create', () => {
    expect(definitionEle.textContent).toEqual('');
  });

  it('no partOfSpeech after create', () => {
    expect(partOfSpeechEle.textContent).toEqual('');
  });

  it('description after detect', () => {
    component.definition = { definition: "test", partOfSpeech: PartOfSpeech.ADJECTIVE }
    fixture.detectChanges();
    expect(definitionEle.textContent).toEqual(component.definition.definition);
  });

  it('partOfSpeech after detect', () => {
    component.definition = { definition: "test", partOfSpeech: PartOfSpeech.ADJECTIVE }
    fixture.detectChanges();
    expect(partOfSpeechEle.textContent).toEqual(component.definition.partOfSpeech);
  });

  it('no selected after create', () => {
    expect(component.selectedDefinition).toEqual(undefined);
  });

  it('emit on click', () => {
    component.definition = { definition: "test", partOfSpeech: PartOfSpeech.ADJECTIVE }
    fixture.detectChanges();
    wrapperDe.triggerEventHandler('click', null);
    expect(component.selectedDefinition).toEqual(component.definition);
  });
});
