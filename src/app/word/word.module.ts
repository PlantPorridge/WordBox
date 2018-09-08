import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WordRoutingModule } from 'src/app/word/word-routing.module';
import { WordMasterComponent } from './word-master/word-master.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordItemComponent } from './word-item/word-item.component';

@NgModule({
  imports: [
    CommonModule,
    WordRoutingModule
  ],
  declarations: [WordMasterComponent, WordListComponent, WordItemComponent]
})
export class WordModule { }
