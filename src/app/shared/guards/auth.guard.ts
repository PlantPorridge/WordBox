import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    canActivate() {
        return this.afAuth.authState.pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                if (!loggedIn) {
                    console.log('access denied');
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
