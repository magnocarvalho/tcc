import { MatSnackBar } from '@angular/material';
import { ViewChild, NgZone, ElementRef } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { } from "googlemaps";
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
  autocomplete;
  formComplete;
  componentForm = {
    street_number: "short_name",
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  zoom: number = 4;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('mapaa')
  public mapagoogle: ElementRef;

  constructor(
    public api: ApiService,
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private tubarao: MatSnackBar
  ) {
    this.form = new FormGroup({
      nomeFantasia: new FormControl(''),
      cnpj: new FormControl(''),
      rua: new FormControl(''),
      numero: new FormControl(''),
      cep: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      ramo: new FormControl(''),
      searchControl: new FormControl('')
    });
  }

  ngOnInit() {
    this.zoom = 16;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // let pick = new google.maps.places.Autocomplete()
      this.autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['establishment'], componentRestrictions: { country: 'br' }
        }
      );

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          for (let i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types[0] == 'street_number') {
              this.form
                .get('numero')
                .setValue(place.address_components[i].long_name);
            } else if (place.address_components[i].types[0] == 'route') {
              this.form
                .get('rua')
                .setValue(place.address_components[i].long_name);
            } else if (
              place.address_components[i].types[0] === 'sublocality_level_1'
            ) {
              this.form
                .get('bairro')
                .setValue(place.address_components[i].long_name);
            } else if (
              place.address_components[i].types[0] ==
              'administrative_area_level_2'
            ) {
              this.form
                .get('cidade')
                .setValue(place.address_components[i].long_name);
            } else if (
              place.address_components[i].types[0] ==
              'administrative_area_level_1'
            ) {
              this.form
                .get('estado')
                .setValue(place.address_components[i].long_name);
            } else if (place.address_components[i].types[0] == 'postal_code') {
              this.form
                .get('cep')
                .setValue(place.address_components[i].long_name);
            }
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }
  public request() {
    var retorno = {
      query:
        this.form.get('rua').value + ' ,' + this.form.get('numero').value
          ? this.form.get('numero').value
          : '' + this.form.get('bairro').value
            ? this.form.get('bairro').value
            : ' ,' + +this.form.get('cidade').value
              ? this.form.get('cidade').value
              : '' + 'Brasil',
      fields: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'postal_code',
        'route',
        'establishment'
      ]
    };
    return retorno;
  }
  nomeFantasias(event) {
    // console.log(event);
    // debugger;
    this.form
      .get('searchControl')
      .setValue(this.form.get('nomeFantasia').value);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  salvarLogin(event) {
    event.preventDefault();
    // this.form.
    console.log(event);
    // debugger;
    if (!this.form.valid) {
      this.tubarao.open('Preenche todo o formulario!');
      return;
    }
    const obj = {
      nomeFantasia: this.form.get('nomeFantasia').value,
      cnpj: this.form.get('cnpj').value,
      rua: this.form.get('rua').value,
      numero: this.form.get('numero').value,
      cep: this.form.get('cep').value,
      bairro: this.form.get('bairro').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      ramo: this.form.get('ramo').value,
      endereco: this.form.get('searchControl'),
      local: [this.longitude, this.latitude]
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
