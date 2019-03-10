import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FullscreenService } from './services/fullscreen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adm';
  // flagLogin = false;

  constructor(public auth: AuthService, public route: ActivatedRoute, private router: Router, private fullscreenService: FullscreenService) { }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
  ngOnInit() {
  }
  sairLogin() {
    this.auth.logout();
  }
 

}
