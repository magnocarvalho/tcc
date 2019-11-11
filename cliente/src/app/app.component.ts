import { Component, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router, NavigationStart, NavigationError } from "@angular/router";
import * as moment from "moment";
import "moment/locale/pt-br";
import { ApiService } from "./services/api.service";
import { User } from "./model/user";
import { LocationService } from "./services/location.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app-cliente";
  mobileQuery: MediaQueryList;
  cliente: User;
  public tipos = [];
  public distancia = 8000;
  public panelOpenState = false;
  public selectedOptions = [];
  private _mobileQueryListener: () => void;
  constructor(
    private rota: Router,
    public api: ApiService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public apiLocation: LocationService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    rota.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        api.user.subscribe((user) => {
          if (user) {
            this.cliente = user;
          } else {
            this.cliente = null;
          }
        });
      }
      if (event instanceof NavigationError) {
      }
    });
    this.apiLocation.setCurrentPosition();
    this.getPromos();
  }
  getPromos() {
    this.api.getData("tipos").subscribe((res) => {
      this.tipos = res;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }

  logout() {
    this.api.doLogout();
    this.rota.navigate(["login"]);
  }
  abrirState(tmp) {
    this.panelOpenState = tmp;
    if (!tmp) {
      this.api.getPromos(
        this.apiLocation.location.latitude,
        this.apiLocation.location.longitude,
        this.distancia,
        this.selectedOptions
      );
    }
  }
  categorias($event) {
    // console.log($event)
    // console.log(v);
    // console.log(s);
    //  console.log(this.selectedOptions)
  }
}
