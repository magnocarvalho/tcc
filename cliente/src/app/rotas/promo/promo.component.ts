import { Component, OnInit, Input, SimpleChanges, ViewChild, } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ApiService } from 'src/app/services/api.service';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import * as moment from 'moment'
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  @ViewChild('swipper', { static: false }) usefulSwiper: SwiperComponent;
  public retorno = [];
  public latitude: number = 0;
  public longitude: number = 0;
  public city: String = '';
  public state: String = '';
  public permissao: boolean = false;
  config: SwiperOptions = {
    slidesPerView: 1, // Slides Visible in Single View Default is 1
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: false,
    autoHeight: true,
  };
  // public distancia = 8000;
  public tipos = [];
  public panelOpenState = false;

  constructor(public api: ApiService, private reverso: LocationService, public rotas: Router, public snack: MatSnackBar) {

  }
  // abrirState(tmp) {
  //   this.panelOpenState = tmp;
  //   if (!tmp) {
  //     this.getPromos()
  //   }
  // }
  dataString(data): String {
    return moment(data).format('l')
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.api.getPromos(position.coords.latitude, position.coords.longitude, 8000)
      }, err => {
        console.log(err)
        this.permissao = true
      });
    }
  }

  async localizacao() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        window.location.reload();
      }, err => {
        console.log(err)
        this.snack.open(err.message, 'error', { duration: 5000 })
        this.permissao = true
      });
    }
  }

  gotToMaps(latitude, longitude) {
    if (confirm('Abrir Google Maps')) {
      if ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)) {
        window.open(`maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`)
      } else {
        window.open(`https://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`)
      }
    }
  }

}
