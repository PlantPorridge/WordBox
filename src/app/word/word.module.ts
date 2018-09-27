import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { DefinitionState } from '@word/state/definition/definition.state';
import { WordAddComponent } from '@word/word-add/word-add.component';
import { WordCardComponent } from '@word/word-card/word-card.component';
import { WordDefinitionListComponent } from '@word/word-definition-list/word-definition-list.component';
import { WordDefinitionComponent } from '@word/word-definition/word-definition.component';
import { WordListComponent } from '@word/word-list/word-list.component';
import { WordMasterState } from '@word/word-master/state/word-master.state';
import { WordMasterComponent } from '@word/word-master/word-master.component';
import { WordRoutingModule } from '@word/word-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    WordRoutingModule,

    NgxsModule.forFeature([
      WordMasterState,
      DefinitionState
    ])
  ],
  declarations: [
    WordMasterComponent,
    WordListComponent,
    WordCardComponent,
    WordAddComponent,
    WordDefinitionComponent,
    WordDefinitionListComponent
  ]
})
export class WordModule { }
