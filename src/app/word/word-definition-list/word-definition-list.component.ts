import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';

@Component({
  selector: 'app-word-definition-list',
  templateUrl: './word-definition-list.component.html',
  styleUrls: ['./word-definition-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordDefinitionListComponent implements OnInit {

  @Input()
  definitions: WordDefinition[];

  @Output()
  selected = new EventEmitter<WordDefinition>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(definition: WordDefinition) {
    this.selected.emit(definition);
  }

}
