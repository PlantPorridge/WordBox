import { Component, Input, OnInit } from '@angular/core';
import { WordItem } from '@shared/interfaces/word/word-item.interface';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss']
})
export class WordItemComponent implements OnInit {

  @Input()
  word: WordItem;

  constructor() { }

  ngOnInit() {
  }

}
