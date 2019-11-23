import { Injectable, OnInit, Injector } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Usuario, User } from "../model/user";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Promo } from "../model/promo";

@Injectable({
  providedIn: "root"
})
export class ApiService implements HttpInterceptor {
  private baseurl = environment.baseURL;
  private token: String = null;
  public isLoading = new BehaviorSubject(false);
  private requests: HttpRequest<any>[] = [];
  public userComplete = new BehaviorSubject(false);
  public user: Observable<firebase.User>;
  public firebaseUser: User = {
    uid: null,
    email: "",
    displayName: "",
    photoURL: "",
    emailVerified: undefined
  };
  public empresaDados: Usuario;
  public promos: Promo[] = [];
  public relatorio: Promo[] = [];

  constructor(
    private http: HttpClient,
    public rotas: Router,
    public loadingBar: LoadingBarService,
    private storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      try {
        if (user) {
          this.firebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          };
          localStorage.setItem("user", JSON.stringify(this.firebaseUser));

          // this.getEmpresa()
          user
            .getIdToken(true)
            .then(res => {
              this.token = res;
              localStorage.setItem("token", res);
              this.getEmpresa();
              this.loadingBar.complete();
            })
            .catch(e => {
              this.loadingBar.complete();
            });
        } else {
          localStorage.removeItem("user");
          // JSON.parse(localStorage.getItem('user'));
          this.token = null;
          localStorage.removeItem("token");
          //  console.log("Nenhum usuario logado");
        }
      } catch (error) {
        this.afAuth.auth.signOut();
      }
    });
    // this.getData('user').toPromise()
  }
  async getEmpresa() {
    let ed: Usuario = await JSON.parse(localStorage.getItem("empresaDados"));
    // console.log(ed)
    // console.log(this.empresaDados)
    if (ed && !this.empresaDados) {
      this.empresaDados = ed;
    }
    if (ed) {
      await this.getData("user").subscribe(async res => {
        if (res != undefined && !res.error) {
          this.empresaDados = Object.assign({}, res);
          await localStorage.setItem("empresaDados", JSON.stringify(res));
          // console.log('Dados dos usuario 73', this.empresaDados)
          await localStorage.setItem("user", JSON.stringify(this.firebaseUser));
          this.userComplete.next(true);
          await this.getPromocoes(this.empresaDados._id);
        } else {
          this.empresaDados = null;
          //  console.log("78 Erro ao buscar o usuario", res)
          this.userComplete.next(false);
        }
      });
    } else {
      await this.getData("user").subscribe(res => {
        if (res != undefined && !res.error) {
          this.empresaDados = Object.assign({}, res);
          localStorage.setItem("empresaDados", JSON.stringify(res));
          // console.log('Dados dos usuario 73', this.empresaDados)
          localStorage.setItem("user", JSON.stringify(this.firebaseUser));
          this.userComplete.next(true);
          this.getPromocoes(this.empresaDados._id);
        } else {
          // console.log("78 Erro ao buscar o usuario", res)
          this.userComplete.next(false);
        }
      });
    }
  }
  getPromocoes(id = this.empresaDados._id || null) {
    this.getData("allpromos", id).subscribe(res => {
      this.relatorio = res;
    });
    return this.getData("promo", id).subscribe(res => {
      this.promos = res;
    });
  }

  getData(rota, param?): Observable<any> {
    return new Observable(observer => {
      let url = this.baseurl;
      let params = {};
      if (param) {
        url = url + rota;
        params = { empresa: param };
      } else {
        url = url + rota;
      }
      // console.log({ url, rota, param })
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .get(`${url}`, { headers: tokenOptions, params })
            .subscribe(res => {
              // console.log(res);

              observer.next(res);
              observer.complete();
            });
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
  postData(rota, obj): Observable<any> {
    this.loadingBar.start();
    if (rota != "user") obj["createdby"] = this.empresaDados._id;

    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .post(this.baseurl + rota, obj, { headers: tokenOptions })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
              this.loadingBar.complete();
            });
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
          this.loadingBar.complete();
        });
    });
  }
  putData(rota, obj, param?): Observable<any> {
    this.loadingBar.start();
    let params = {};
    if (param) {
      params = { empresa: param };
    }
    if (rota != "user") obj["modifiedby"] = this.empresaDados._id;
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .put(this.baseurl + rota, obj, { headers: tokenOptions, params })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
              this.loadingBar.complete();
            });
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
          this.loadingBar.complete();
        });
    });
  }
  async getTokenHeader() {
    if (!this.token) {
      let tk = await localStorage.getItem("token");
      if (tk) {
        await firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.token = token;
            localStorage.setItem("token", token);
          })
          .catch(e => {
            console.error(e);
            this.showSuccess(
              "Algo errado aconteceu, você precisa fazer login novamente"
            );
            this.logout();
          });
        let tokenHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`
        };
        return tokenHeader;
      }
      // } else {
      //     this.showSuccess('Algo errado aconteceu, você precisa fazer login novamente')
      //     // this.logout()
      // }
    }
    if (this.token) {
      let tokenHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      };
      return tokenHeader;
    }
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.isLoading.next(this.requests.length > 0);
  }
  showSuccess(mensagem) {
    this.toastr.success(mensagem, "Sucesso");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    // //("No of requests--->" + this.requests.length);
    this.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => {
          // alert('error returned');
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          this.loadingBar.complete();
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        this.loadingBar.complete();
        subscription.unsubscribe();
      };
    });
  }
  get isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  get isLoggedInNotUser(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.uid !== null ? true : false;
  }

  doUserDados() {
    return this.afAuth.auth.currentUser;
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          // console.log(err);
          reject(err);
        }
      );
    });
  }
  doRegister(value, arquivoImg) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.pass)
        .then(res => {
          this.doCheckEmail()
            .then(email => {
              // console.log("email", email);
              this.uploadPerfilImagem(arquivoImg, res.user.uid)
                .then(img => {
                  //  console.log(img);
                  this.doUpdateUser(value.name, img.caminhoImagem)
                    .then(useUpdate => {
                      resolve(this.afAuth.auth.currentUser);
                    })
                    .catch(updateErro => {
                      //  console.log("Erro Update perfil do usuario", updateErro);
                      reject(updateErro);
                    });
                })
                .catch(imgErro => {
                  //  console.log("Erro uploadImg do usuario", imgErro);
                  reject(imgErro);
                });
            })
            .catch(errEmail => {
              //  console.log("Erro Check Email do usuario", errEmail);
              reject(errEmail);
            });
        })
        .catch(err => {
          //  console.log("Erro Criar usuario", err);
          reject(err);
        });
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this.doUserDados()
              .getIdToken(true)
              .then(idT => {
                this.token = idT;
                this.loadingBar.increment(60);
                this.getData("user").subscribe(
                  (empresa: Usuario) => {
                    //  console.log('empresa 202', empresa)

                    if (empresa["error"] == 405) {
                      this.showSuccess(
                        "Login iniciado com sucesso, falta terminar o cadastro"
                      );
                      this.rotas.navigate(["form-empresa"]);
                      resolve("form-empresa");
                    } else {
                      this.empresaDados = empresa;
                      localStorage.setItem(
                        "empresaDados",
                        JSON.stringify(empresa)
                      );
                      //  console.log('Dados dos usuario 353', this.empresaDados.cidade)
                      // localStorage.setItem('user', JSON.stringify(this.firebaseUser));
                      localStorage.setItem(
                        "user",
                        JSON.stringify({
                          displayName: res.user.displayName,
                          email: res.user.email,
                          emailVerified: res.user.emailVerified
                        })
                      );
                      this.loadingBar.increment(90);
                      this.showSuccess("Login Realizado com sucesso");

                      this.rotas.navigate(["adm"]);
                      resolve("adm");
                    }
                  },
                  err => {
                    this.logout();
                    reject(err);
                  }
                );
              });
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        localStorage.setItem("user", null);
        resolve();
      } else {
        reject();
      }
    });
  }

  doUpdateUser(displayName, photoURL) {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.currentUser
          .updateProfile({ displayName, photoURL })
          .then(criar => resolve(criar))
          .catch(erro => reject(erro));
      } else {
        reject("usario invalido");
      }
    });
  }

  doCheckEmail() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.currentUser.sendEmailVerification();
        resolve();
      } else {
        reject();
      }
    });
  }

  get getUserDados(): Usuario {
    let tmp: Usuario = JSON.parse(localStorage.getItem("empresaDados"));
    return tmp;
  }

  createUser(obj): Observable<any> {
    obj.displayName = this.firebaseUser.displayName;
    obj.uid = this.firebaseUser.uid;
    obj.email = this.firebaseUser.email;
    obj.photoURL = this.firebaseUser.photoURL;
    return new Observable(observer => {
      this.postData("user", obj).subscribe(
        res => {
          if (res != undefined) {
            this.empresaDados = Object.assign({}, res);
            localStorage.setItem("empresaDados", JSON.stringify(res));
            // console.log('Dados dos usuario 353', this.empresaDados.cidade)
            localStorage.setItem("user", JSON.stringify(this.firebaseUser));
            this.userComplete.next(true);
            this.getPromocoes(this.empresaDados._id);
            observer.next(res);
            observer.complete();
          } else {
            this.userComplete.next(false);
            // console.log("Erro ao buscar o usuario", res)
            observer.error("Erro ao buscar o usuario");
            observer.complete();
          }
        },
        err => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }

  getUserLogin(token): Observable<any> {
    return this.getData("user");
  }

  getTipos(): Observable<any> {
    return this.getData("tipos");
  }

  errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  logout() {
    localStorage.setItem("userDados", null);
    this.doLogout().finally(() => {
      // console.log('Logout');
      //  console.log('Logout');
    });
    this.token = null;
    this.empresaDados = null;
    this.firebaseUser = null;
    localStorage.setItem("user", null);
    localStorage.setItem("empresaDados", null);
  }
  uploadFoto(base64, uid, titulo) {
    this.loadingBar.start();
    let path = `promocao/${uid}/${titulo}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    let taksUpload = fileRef.putString(base64, "data_url");
    return new Promise<any>((resolve, reject) => {
      taksUpload.task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          this.loadingBar.set(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (snapshot.state == "sucess") {
            // console.log('Uploaded a data_url string!', snapshot.downloadURL);
            this.loadingBar.complete();
            // this.loadingBar.
          }
        },
        erro => {
          // console.log('Falhou o upload')
          alert(
            "Falha ao fazer o upload da sua imagem, tente novamente mais tarde"
          );
          this.loadingBar.complete();
          reject(erro);
        },
        () => {
          taksUpload.task.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              // console.log('File available at', downloadURL);
              resolve(downloadURL);
            });
        }
      );
    });
  }

  uploadPerfilImagem(file, uid) {
    var caminhoImagem = "";
    var task = null;
    this.loadingBar.start();

    let path = `perfil/${uid}/${file.name}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    task = this.storage.upload(path.replace(/\s/g, ""), file);
    // uploadPercent = task.percentageChanges();
    return new Promise<any>((resolve, reject) => {
      task.then(up => {
        fileRef.getDownloadURL().subscribe(
          url => {
            caminhoImagem = url;
            this.loadingBar.complete();
            resolve({ caminhoImagem });
          },
          erroImg => {
            //  console.log(erroImg);
            this.loadingBar.complete();
            reject(erroImg);
          }
        );
      });
    });
  }
  promoPost(obj: Promo): Observable<Promo> {
    return new Observable(observer => {
      this.postData("promo", obj).subscribe(res => {
        this.promos.push(res);
        this.showSuccess("Nova Promoção Salva com sucesso");
        observer.next(res);
      });
    });
  }
  promoPut(obj: Promo): Observable<Promo> {
    return new Observable(observer => {
      this.putData("promoupdate", obj).subscribe(
        res => {
          this.promos.push(res);
          this.showSuccess("Promoção Atualizada com sucesso");
          observer.next(res);
        },
        err => {
          console.log("Promoção Atualizada", err);
          observer.error(err);
        }
      );
    });
  }

  updateUserDados(obj: Usuario): Observable<any> {
    return new Observable(observer => {
      this.putData("user", obj).subscribe(res => {
        this.empresaDados = Object.assign({}, res);
        localStorage.setItem("empresaDados", JSON.stringify(res));
        // console.log('Dados dos usuario 73', this.empresaDados)
        localStorage.setItem("user", JSON.stringify(this.firebaseUser));
        this.showSuccess("Dados do usuario atualizados com sucesso");
        observer.next(res);
      });
    });
  }
}
