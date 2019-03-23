import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event, NavigationError } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FullscreenService } from './services/fullscreen.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gastando Pouco!';
  flagLogin = false;


  constructor(public api: ApiService, public auth: AuthService, public route: ActivatedRoute, public router: Router, public loader: LoadingBarService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        loader.start();
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (this.usuarioLogado()) {
          this.flagLogin = true;
          this.title = this.api.currentUserValue.email ? this.api.currentUserValue.nome : this.api.currentUserValue.email;
        } else {
          this.flagLogin = false;
          this.title = 'Gastando Pouco!';
        }
        loader.complete();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        loader.complete();
        // Present error to user
        console.log(event.error);
      }
    });

  }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;

  }
  ngOnInit() {

  }
  sairLogin() {
    this.auth.logout();
  }
  usuarioLogado(): boolean {
    return this.auth.isLoggedIn();
  }


}
