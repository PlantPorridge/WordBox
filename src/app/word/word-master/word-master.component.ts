import { Component, OnInit } from '@angular/core';
import { WordItem } from '@shared/interfaces/word/word-item.interface';

@Component({
  selector: 'app-word-master',
  templateUrl: './word-master.component.html',
  styleUrls: ['./word-master.component.scss']
})
export class WordMasterComponent implements OnInit {

  loadedWords: WordItem[] = [
    { word: "One" },
    { word: "Two" },
    { word: "Three" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
