import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FullscreenService } from './services/fullscreen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adm';
  flagLogin: Observable<boolean> = of(false);

  constructor(public auth: AuthService, public route: ActivatedRoute) {
    

  }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;

  }
  ngOnInit() {
    this.auth.isLogged.subscribe(res => {
      console.log(res);
      if (res == true)
        this.flagLogin = of(true);
    })
  }
  sairLogin() {
    this.auth.logout();
  }



}
