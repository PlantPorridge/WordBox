import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PartOfSpeech } from '@shared/enums/part-of-speech.enum';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { WordDefinitionComponent } from '@word/word-definition/word-definition/word-definition.component';
import { WordDefinitionListComponent } from './word-definition-list.component';

@Component({
  template: `
    <app-word-definition-list [definitions]="definitions" (selected)="onDefinitionSelected($event)">
    </app-word-definition-list>`
})
class TestHostComponent {
  definitions: WordDefinition[];
  selectedDefinition: WordDefinition;
  onDefinitionSelected(definition: WordDefinition) {
    this.selectedDefinition = definition;
  }
}

fdescribe('WordDefinitionListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let listDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordDefinitionListComponent, WordDefinitionComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    listDe = fixture.debugElement.query(By.css('app-word-definition-list'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 app-word-definition', () => {
    let definitions: WordDefinition[] = [
      { definition: 'one', partOfSpeech: PartOfSpeech.ADJECTIVE },
      { definition: 'two', partOfSpeech: PartOfSpeech.ADJECTIVE }
    ]
    component.definitions = definitions;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-word-definition').length).toEqual(2);
  });

  it('emit recieved item', () => {
    let definition = { definition: "test", partOfSpeech: PartOfSpeech.ADJECTIVE };
    // fixture.detectChanges();
    (listDe.componentInstance as WordDefinitionListComponent).onSelected(definition);
    expect(component.selectedDefinition).toEqual(definition);
  });
});
