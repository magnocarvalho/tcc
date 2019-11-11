import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import * as firebase from "firebase/app";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Promo } from '../model/promo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public user: Observable<firebase.User>;
  private token: String = null;
  private baseurl = environment.baseURL;
  public firebaseUser: User = {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
  };
  public promos = [];
  constructor(private http: HttpClient, public rotas: Router, public loadingBar: LoadingBarService, private storage: AngularFireStorage, public afAuth: AngularFireAuth, private toastr: ToastrService) {

    afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      try {
        if (user) {
          this.firebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          };
          localStorage.setItem('user', JSON.stringify(this.firebaseUser));
          user.getIdToken(true).then(res => {
            this.token = res
            localStorage.setItem('token', res)
            this.loadingBar.complete()

          }).catch(e => {
            this.loadingBar.complete()
          })
        }
      } catch (error) {
        this.afAuth.auth.signOut();
      }
    });
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.singIn(provider)
  }

  doTwitterLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.singIn(provider)
  }

  doFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.singIn(provider)
  }

  singIn(provider) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          //  console.log(err);
          reject(err);
        }
      );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut().finally(() => {
          localStorage.setItem('user', null);
          this.token = null;
          this.firebaseUser = null;
          resolve();
        });
      } else {
        reject();
      }
    });
  }

  getData(rota, params = {}): Observable<any> {
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http.get(`${this.baseurl}${rota}`, { headers: tokenOptions, params })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
            })
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  postData(rota, obj): Observable<any> {
    this.loadingBar.start()
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http.post(this.baseurl + rota, obj, { headers: tokenOptions })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
              this.loadingBar.complete()
            })
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
          this.loadingBar.complete()
        });
    });
  }

  putData(rota, obj): Observable<any> {
    this.loadingBar.start()
    if (rota != 'user')
      obj['modifieduid'] = this.firebaseUser.uid
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http.put(this.baseurl + rota, obj, { headers: tokenOptions })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
              this.loadingBar.complete()
            })
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
          this.loadingBar.complete()
        });
    });
  }

  async getTokenHeader() {
    if (!this.token) {
      let tk = await localStorage.getItem('token')
      if (tk) {
        this.token = tk
        let tokenHeader = {
          'Content-Type': 'application/json',
          "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
          'Authorization': `Bearer ${tk}`
        };
        return tokenHeader;
      }

    }
    if (this.token) {
      let tokenHeader = {
        'Content-Type': 'application/json',
        "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
        'Authorization': `Bearer ${this.token}`
      };
      return tokenHeader;
    }

  }

  showSuccess(mensagem) {
    this.toastr.success(mensagem, 'Sucesso');
  }

  getPromos(latitude, longitude, distancia, category = []) {
    this.getData('promos', { lat: latitude, lng: longitude, distance: distancia, category: category }).subscribe(res => {
      this.promos = res
    })
  }

  get isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.uid !== false) ? true : false;
  }

}
