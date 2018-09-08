import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { WordRoutingModule } from 'src/app/word/word-routing.module';
import { WordAddComponent } from './word-add/word-add.component';
import { WordItemComponent } from './word-item/word-item.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordMasterComponent } from './word-master/word-master.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WordRoutingModule,

    NgxsModule.forFeature([
      WordMasterState
    ])
  ],
  declarations: [WordMasterComponent, WordListComponent, WordItemComponent, WordAddComponent]
})
export class WordModule { }
