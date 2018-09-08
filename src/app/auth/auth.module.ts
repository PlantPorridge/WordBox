import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { LoginComponent } from 'src/app/auth/login/login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,

        AuthRoutingModule

        // NgxsModule.forRoot([

        // ]),
        // NgxsStoragePluginModule.forRoot(),
        // NgxsLoggerPluginModule.forRoot(),

        // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: []
})
export class AuthModule { }
