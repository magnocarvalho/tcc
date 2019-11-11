import { Component, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationStart, NavigationError } from "@angular/router";
import { User } from "./model/user";

import { ApiService } from './services/api.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  title = "empresa";
  mobileQuery: MediaQueryList;
  uid: any = "";
  email: any = "";
  displayName: any = "";
  photoURL: any = "";
  emailVerified: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.api.isLoading;
  userComplete: Subject<boolean> = this.api.userComplete;
  private _mobileQueryListener: () => void;
  constructor(private rota: Router, public api: ApiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    rota.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        api.user.subscribe(user => {
          if (user) {
            this.uid = user.uid;
            this.email = user.email;
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            this.emailVerified = user.emailVerified;
          }
        });
      }
      if (event instanceof NavigationError) {
        //caso de erro na rota ou falha na requisição
        // api.doLogout();
      }
    });

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }

  onLoginOut() {
    // this.api.doLogout();
    this.api.logout()
    this.uid = "";
    this.email = "";
    this.displayName = "";
    this.photoURL = "";
    this.emailVerified = false;
    this.linkRota('index');
  }
}
