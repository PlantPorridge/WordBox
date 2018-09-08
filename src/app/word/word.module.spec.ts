import { WordModule } from './word.module';

describe('WordModule', () => {
  let wordModule: WordModule;

  beforeEach(() => {
    wordModule = new WordModule();
  });

  it('should create an instance', () => {
    expect(wordModule).toBeTruthy();
  });
});
