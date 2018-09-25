import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { WordRoutingModule } from 'src/app/word/word-routing.module';
import { WordAddComponent } from './word-add/word-add.component';
import { WordCardComponent } from './word-card/word-card.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordMasterComponent } from './word-master/word-master.component';
import { WordDefinitionComponent } from './word-definition/word-definition/word-definition.component';
import { WordDefinitionListComponent } from './word-definition-list/word-definition-list/word-definition-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    WordRoutingModule,

    NgxsModule.forFeature([
      WordMasterState
    ])
  ],
  declarations: [WordMasterComponent, WordListComponent, WordCardComponent, WordAddComponent, WordDefinitionComponent, WordDefinitionListComponent]
})
export class WordModule { }
