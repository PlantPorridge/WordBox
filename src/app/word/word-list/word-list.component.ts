import { state, style, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WordItem } from '@shared/interfaces/word/word-item.interface';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      // transition('void => *', [
      //   style({ opacity: 0 }),
      //   animate(500)
      // ]),
      // transition('* => void', animate(500, style({ opacity: 0 })))
    ])
  ]
})
export class WordListComponent implements OnInit {

  @Input()
  words: WordItem[];

  constructor() { }

  ngOnInit() {
  }

}
