import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable, Subscriber, BehaviorSubject } from "rxjs";
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private email;

  public usuario: User;
  private onLogin = new BehaviorSubject<boolean>(false);
  public firebaseToken = '';

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
        this.email = this.userDetails.email;
      } else {
        console.log("nenhum usuario logado");
        this.userDetails = null;
      }
    });

  }
  init(second = false) {
    if (!this.usuario) {
      if (second)
        return;
      this._firebaseAuth.authState.subscribe(user => {
        this.usuario = user;
        this.init(true);
      }, err => {
        // this.sub.forEach(s => {
        //   s.next(false);
        // });
        console.error(err);
      });
      return;
    }
    this.usuario.getIdToken().then(token => {
      localStorage.setItem('firebase', token);
      let aux = localStorage.getItem('firebase');
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
        localStorage.setItem('firebase', res.user.uid);
        console.log("login com sucesso");
        // console.log(this.userDetails);
      });
  }
  createUser(user) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(user.email, user.senha)
      .then(() => {
        var user = this._firebaseAuth.auth.currentUser;
        user
          .sendEmailVerification()
          .then(() => {
            console.log("please verify your email")
            localStorage.clear();
            localStorage.setItem('firebase', user.uid);
            console.log("login com sucesso");
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
    this._firebaseAuth.auth.signOut().then(res => {
      this.userDetails = null;
      this.router.navigate(["/login"])
    }, err => {
      console.error(err);
    });
  }
  emails() {
    return this.email || 'Email invalido';
  }
}
