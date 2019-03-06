import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:1337/';
  // Postagem
  postagemAdd(obj) {
    this.http
      .post(this.uri + 'add', obj)
      .subscribe(res => console.log('Done'));
  }
}
