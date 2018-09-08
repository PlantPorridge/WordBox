import { WordItem } from "@shared/interfaces/word/word-item.interface";

export class GetWordsAction {
  static readonly type = '[Word Master] Get Words';
  constructor() { }
}

export class AddWordAction {
  static readonly type = '[Word Master] Add Word';
  constructor(public newWord: WordItem) { }
}
