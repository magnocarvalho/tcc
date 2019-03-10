import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FullscreenService {
  fullscreen$: Observable<boolean>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.fullscreen$ = this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          return false;
        }
        else {
          return true;
        }
      })
  }


}