import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { WordItem } from '@shared/interfaces/word/word-item.interface';
import { DefinitionService } from '@word/services/definition.service';
import { RemoveWord, UpdateWord } from '@word/word-master/state/word-master.actions';
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

  constructor(
    private store: Store,
    private definitionService: DefinitionService
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
    console.log('lookup')
    this.definitionService.getDefinitions(this.word.word).pipe(
      map(resp => DefinitionService.responseToDefine(resp))
    ).subscribe((a) => console.log(a));
  }

}
