import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adm';
  flagLogin = false;

  constructor(public auth: AuthService, public route: ActivatedRoute, private router: Router) { }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
  ngOnInit() {

  }
  sairLogin() {
    this.auth.logout();
  }
  checkRota() {
    console.log(this.router.url);
    var url: string = this.router.url;
    if (url == 'login') {
      this.flagLogin = true;
    }else {
      this.flagLogin = false;
    }

  }


}
