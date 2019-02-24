import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }
  createUser(user) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(user.email, user.senha)
      .then(() => {
        var user = this._firebaseAuth.auth.currentUser;
        user
          .sendEmailVerification()
          .then(() => console.log("please verify your email"))
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
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }
}
