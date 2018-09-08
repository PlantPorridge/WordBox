import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WordItem } from '@shared/interfaces/word/word-item.interface';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordListComponent implements OnInit {

  @Input()
  words: WordItem[];

  constructor() { }

  ngOnInit() {
  }

}
