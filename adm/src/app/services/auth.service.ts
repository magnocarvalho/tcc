import { TokenStorage } from './token.storage';
import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private email;

  public usuario: User;
  private onLogin = new BehaviorSubject<boolean>(false);
  public firebaseToken = '';

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    public api: ApiService,
    public token: TokenStorage
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
      } else {
        console.log('nenhum usuario logado');
        this.userDetails = null;
      }
    });
  }
  init(second = false) {
    if (!this.usuario) {
      if (second) {
        return;
      }
      this._firebaseAuth.authState.subscribe(
        user => {
          this.usuario = user;
          this.init(true);
        },
        err => {
          console.error(err);
        }
      );
      return;
    }
    this.usuario.getIdToken().then(token => {
      localStorage.setItem('firebase', token);
      const aux = localStorage.getItem('firebase');
      this.firebaseToken = aux;
    });
  }
  get isLogged() {
    return this.onLogin.asObservable();
  }

  login(obj) {
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(obj.email, obj.senha)
      .then(res => {
        localStorage.clear();
        this.api.login(res.user.uid).subscribe(login => {
          console.log('login com sucesso');
        });
        // console.log(this.userDetails);
      });
  }
  createUser(obj) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(obj.email, obj.senha)
      .then(() => {
        const user = this._firebaseAuth.auth.currentUser;
        user
          .sendEmailVerification()
          .then(() => {
            console.log({ user, obj });
            this.api.register(user, obj).subscribe(res => {});
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(
      res => {
        this.userDetails = null;
        this.token.signOut();
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
      }
    );
  }
  emails() {
    return this.email || 'Email invalido';
  }
}
