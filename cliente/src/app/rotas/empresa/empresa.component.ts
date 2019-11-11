import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Empresa } from "src/app/model/empresa";
import { MapsAPILoader } from "@agm/core";
import {
  Location,
  Appearance
} from "@angular-material-extensions/google-maps-autocomplete";
import { MatSnackBar } from "@angular/material";
declare var google: any;
@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.css"]
})
export class EmpresaComponent implements OnInit {
  public promos = [];
  public infos: Empresa = new Empresa();
  public latitude = 0;
  public icons = "";
  public longitude = 0;
  public zoom = 15;
  public categoria = "";
  public id: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getDados();
  }
  async getDados() {
    let uid = await this.api.firebaseUser.uid;
    if (!uid) {
      let user = await JSON.parse(localStorage.getItem("user"));
      uid = user.uid;
    }
    this.api.getData("empresa", { empresa: this.id, uid }).subscribe((res) => {
      this.promos = res[0].promos;
      this.infos = res[0];
      this.latitude = res[0].location.coordinates[0];
      this.longitude = res[0].location.coordinates[1];
      this.icons = res[0].tipo.icon;
      this.categoria = res[0].tipo.value;
    });
  }
  dataString(data): String {
    return moment(data).format("l");
  }
  favoritar(id) {
    this.api.postData("favorites", { id: id }).subscribe((res) => {
      // console.log(res)
      this.getDados();
    });
  }
  excluir(id) {
    this.api.putData("favorites", { id: id }).subscribe((res) => {
      this.getDados();
    });
  }
}
