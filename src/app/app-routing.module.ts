import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: 'src/app/auth/auth.module#AuthModule'
    },
    {
        path: 'word',
        loadChildren: 'src/app/word/word.module#WordModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    declarations: []
})
export class AppRoutingModule { }
