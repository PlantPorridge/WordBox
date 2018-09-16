import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordItem } from '@shared/interfaces/word/word-item.interface';

@Component({
  selector: 'app-word-add',
  templateUrl: './word-add.component.html',
  styleUrls: ['./word-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordAddComponent implements OnInit {

  @Output()
  addWord: EventEmitter<WordItem> = new EventEmitter<WordItem>();

  public form: FormGroup;
  private newWord: WordItem;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      word: [null, [Validators.required]]
    });
  }

  private applyChanges() {
    this.newWord = {
      id: null,
      word: this.form.get('word').value,
      starred: false
    };
  }

  public outputWord() {
    if (this.form.valid) {
      this.applyChanges();
      this.addWord.emit(this.newWord);
      this.form.reset();
    }
  }

}
