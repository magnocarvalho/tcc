import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscriber, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public onLogin: Observable<boolean> = of(false);
  private sub: Subscriber<boolean>[] = [];
  constructor(public auth: AuthService) { 
   this.onLogin = this.auth.isLogged;
  }
  

}
