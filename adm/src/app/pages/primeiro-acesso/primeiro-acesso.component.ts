import { ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-primeiro-acesso",
  templateUrl: "./primeiro-acesso.component.html",
  styleUrls: ["./primeiro-acesso.component.css"]
})
export class PrimeiroAcessoComponent implements OnInit {
  form;
  texto: string = "Wenceslau Braz - Cuidado com as cargas";
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  constructor(public api: ApiService, public router: Router) {
    this.form = new FormGroup({
      nomeFantasia: new FormControl(""),
      cnpj: new FormControl(""),
      rua: new FormControl(""),
      numero: new FormControl(""),
      cep: new FormControl(""),
      bairro: new FormControl(""),
      cidade: new FormControl(""),
      estado: new FormControl(""),
      ramo: new FormControl("")
    });
  }

  ngOnInit() {
    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
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
