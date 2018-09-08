import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { AddWordAction, GetWordsAction } from '@word/word-master/state/word-master.actions';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-word-master',
  templateUrl: './word-master.component.html',
  styleUrls: ['./word-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordMasterComponent implements OnInit {

  @Select(WordMasterState.words) words$: Observable<WordItem[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetWordsAction()).subscribe();
  }

  public addWord(newWord: WordItem) {
    this.store.dispatch(new AddWordAction(newWord)).subscribe();
  }

}
