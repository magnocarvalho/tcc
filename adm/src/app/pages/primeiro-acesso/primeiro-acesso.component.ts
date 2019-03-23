import { ViewChild, NgZone, ElementRef } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
// import {} from '@agm/core/services/google-maps-types';
// import { google } from '@google/maps';
declare var google: any;
@Component({
  selector: "app-primeiro-acesso",
  templateUrl: "./primeiro-acesso.component.html",
  styleUrls: ["./primeiro-acesso.component.css"]
})
export class PrimeiroAcessoComponent implements OnInit {
  form;
  // texto: string = "Wenceslau Braz - Cuidado com as cargas";
  public latitude: number;
  public longitude: number;
  // public searchControl: FormControl;
  zoom: number = 4;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(public api: ApiService, public router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.form = new FormGroup({
      nomeFantasia: new FormControl(""),
      cnpj: new FormControl(""),
      rua: new FormControl(""),
      numero: new FormControl(""),
      cep: new FormControl(""),
      bairro: new FormControl(""),
      cidade: new FormControl(""),
      estado: new FormControl(""),
      ramo: new FormControl(""),
      searchControl: new FormControl("")
    });
  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 4;
      });
    }
  }
  salvarLogin() {
    const obj = {
      nomeFantasia: this.form.get("nomeFantasia").value,
      cnpj: this.form.get("cnpj").value,
      rua: this.form.get("rua").value,
      numero: this.form.get("numero").value,
      cep: this.form.get("cep").value,
      bairro: this.form.get("bairro").value,
      cidade: this.form.get("cidade").value,
      estado: this.form.get("estado").value,
      ramo: this.form.get("ramo").value
    };
    this.api.primeiroAcesso(obj).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }
}
