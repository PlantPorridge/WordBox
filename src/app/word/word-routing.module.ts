import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordMasterComponent } from './word-master/word-master.component';

const routes: Routes = [
    {
        path: '',
        component: WordMasterComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class WordRoutingModule { }
