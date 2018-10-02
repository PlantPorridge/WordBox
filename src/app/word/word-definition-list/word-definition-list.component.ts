import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';

@Component({
  selector: 'app-word-definition-list',
  templateUrl: './word-definition-list.component.html',
  styleUrls: ['./word-definition-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordDefinitionListComponent {

  @Input()
  definitions: WordDefinition[];

  @Output()
  selected = new EventEmitter<WordDefinition>();

  public activeIndex: number = 0;

  constructor() { }

  onSelected(definition: WordDefinition) {
    this.selected.emit(definition);
  }

  left() {
    this.activeIndex = (this.activeIndex === 0 ? this.definitions.length : this.activeIndex) - 1;
  }

  right() {
    this.activeIndex = (this.activeIndex + 1) % this.definitions.length;
  }
}
