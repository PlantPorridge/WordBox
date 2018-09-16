import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { RemoveWord, UpdateWord } from '@word/word-master/state/word-master.actions';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WordCardComponent implements OnInit {

  @Input()
  word: WordItem;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  toggleStarred(){
    this.store.dispatch(new UpdateWord(Object.assign({}, this.word, { starred: !this.word.starred })))
  }

  remove() {
    this.store.dispatch(new RemoveWord(this.word));
  }

  update() {
    this.store.dispatch(new UpdateWord(Object.assign({}, this.word, { word: this.word.word + 'U' })));
  }

}
