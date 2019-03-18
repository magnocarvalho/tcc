import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/observable/fromPromise";
import { environment } from "src/environments/environment";
import { TokenStorage } from "./token.storage";
import { Subject, BehaviorSubject } from "rxjs";

export interface usuarioData {
  id: string;
  email: string;
  nome?: string;
  empresa: string;
  uid: string;
  master: boolean;
  nomeFantasia: string;
  cnpj: string;
  rua: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
}
@Injectable({
  providedIn: "root"
})
@Injectable()
export class ApiService implements HttpInterceptor {
  URL = environment.url;
  URL_ASSETS = environment.assets;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  // token = new TokenStorage();
  usuarioLogado: usuarioData;
  private currentUserSubject: BehaviorSubject<usuarioData>;
  public currentUser: Observable<usuarioData>;

  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    public rota: Router
  ) {
    // this.token = localStorage.getItem("firebase");
    this.headers.append("Authorization", token.getFirebase());
    this.currentUserSubject = new BehaviorSubject<usuarioData>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      responseType: "json"
    });

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do stuff with response error if you want
        }
      }
    );
  }
  public get currentUserValue(): usuarioData {
    return this.currentUserSubject.value;
  }

  postPublicacao(obj): Observable<any> {
    return Observable.create(resposta => {
      this.http
        .post(this.URL + "publicacao", obj, { headers: this.headers })
        .subscribe((data: any) => {
          resposta.next();
          console.log(data);
          resposta.complete();
        });
    });
  }
  login(firebase): Observable<any> {
    return Observable.create(observer => {
      this.http
        .post(this.URL + "login", { uid: firebase })
        .subscribe((data: any) => {
          observer.next();
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
          this.token.saveID(data._id);
          this.token.saveFirebase(data.uid);
          observer.complete();
        });
    });
  }
  register(user, obj): Observable<any> {
    const objeto = {
      email: obj.email,
      uid: user.uid,
      nome: obj.nome
    };
    return Observable.create(observer => {
      this.http
        .post(this.URL + "register", objeto, { headers: this.headers })
        .subscribe((data: any) => {
          observer.next();
          console.log(data);
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
          this.token.saveID(data._id);
          this.token.saveFirebase(data.uid);
          observer.complete();
        });
    });
  }
  primeiroAcesso(obj): Observable<any> {
    return Observable.create(observer => {
      this.http
        .put(this.URL + "primeiro-acesso/" + this.token.getID(), obj, {
          headers: this.headers
        })
        .subscribe((data: any) => {
          observer.next();
          this.currentUserSubject.next(data);
          this.rota.navigate(["dashboard"]);
          observer.complete();
        });
    });
  }
}
