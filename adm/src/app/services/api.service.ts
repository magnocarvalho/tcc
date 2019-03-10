import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService implements HttpInterceptor {
  URL = environment.url;
  URL_ASSETS = environment.assets;
  token;
  usuarioData: {
    name: string,
    email: string,
    empresa: string,
    code: string,
    master: boolean
  };
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("__token");
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(request, next));
  }
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    const token = await this.token;
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['x-access-token'] = this.token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest).toPromise();
  }
  private request(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null, obs) {

    let options 
    if (!data)
      data = {};
    var callback = res => {
      if (res.status === 444) {
        this.router.navigate(['/auth']);
        return;
      }

      if (res.status < 200 || res.status >= 300) {
        obs.error(res.json());
      }
      else {
        // quando loga ele retorna no header o token
        var headers = res.headers;
        if (headers && headers.get('x-access-token')) {
          // só retorna no login e reloagin
          this.usuarioData = res.json();
          this.token = headers.get('x-access-token');
          localStorage.setItem("__token", headers.get('x-access-token'));
        }

        obs.next(res);
      }
      obs.complete();
    };

    if (method == 'get' && data) {
      options.params = data;
    }

    if (method == "get" || method == "delete") {
      this.http[method](this.URL + url, options).subscribe(callback, callback);
    }
    else
      this.http[method](this.URL + url, data, options).subscribe(callback, callback);
  }

  public doLogin(email, pass) {
    return this.doRequest('post', 'login', { email: email, pass: pass });
  }
  public reLogin(id = null) {
    return this.doRequest('put', 'login', { IdEmpresa: id });
  }
  public doRequest(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null): Observable<any> {
    return new Observable(obs => {
      this.request(method, url, data, obs);
    }).map((res: Response) => {
      return res.json();
    });
  }


}
