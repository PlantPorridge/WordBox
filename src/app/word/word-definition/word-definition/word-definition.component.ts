import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';

@Component({
  selector: 'app-word-definition',
  templateUrl: './word-definition.component.html',
  styleUrls: ['./word-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordDefinitionComponent implements OnInit {

  @Input()
  definition: WordDefinition;

  @Output()
  selected = new EventEmitter<WordDefinition>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.selected.emit(this.definition);
  }

}
