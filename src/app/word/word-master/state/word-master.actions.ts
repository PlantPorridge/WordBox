import { WordItem } from '@shared/interfaces/word/word-item.interface';

export class QueryWords {
  static readonly type = '[Word Master] Query Words';
  constructor(public uid: string) { }
}

export class AddedWord {
  static readonly type = '[Word Master] Added Word';
  constructor(public word: WordItem) { }
}

export class RemovedWord {
  static readonly type = '[Word Master] Removed Word';
  constructor(public word: WordItem) { }
}

export class ModifiedWord {
  static readonly type = '[Word Master] Modified Word';
  constructor(public word: WordItem) { }
}

export class AddWord {
  static readonly type = '[Word Master] Add Word';
  constructor(public word: WordItem) { }
}

export class RemoveWord {
  static readonly type = '[Word Master] Remove Word';
  constructor(public word: WordItem) { }
}

export class UpdateWord {
  static readonly type = '[Word Master] Update Word';
  constructor(public word: WordItem) { }
}

export class Success {
  static readonly type = '[Word Master] Success';
  constructor() { }
}
