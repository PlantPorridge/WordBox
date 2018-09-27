import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { GetDefintions } from '@word/state/definition/definition.actions';
import { DefinitionState } from '@word/state/definition/definition.state';
import { RemoveWord, UpdateWord } from '@word/word-master/state/word-master.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('star', [
      state('active', style({})),
      state('inactive', style({})),
      transition('* => active', [
        style({ transform: 'rotate(360deg)' }),
        animate('750ms ease-out')
      ]),
    ])
  ]

})
export class WordCardComponent implements OnInit {

  @Input()
  word: WordItem;

  @Select(DefinitionState.getWordDefinitionsFn) getWordDefinitionsFn$: Observable<(word: string) => WordDefinition[]>;

  get definitions$() {
    return this.getWordDefinitionsFn$.pipe(map(filterFn => filterFn(this.word.word)));
  }

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  toggleStarred() {
    this.store.dispatch(new UpdateWord(Object.assign({}, this.word, { starred: !this.word.starred })));
  }

  remove() {
    this.store.dispatch(new RemoveWord(this.word));
  }

  update() {
    this.store.dispatch(new UpdateWord(Object.assign({}, this.word, { word: this.word.word + 'U' })));
  }

  lookup() {
    this.store.dispatch(new GetDefintions(this.word.word));
  }

}
