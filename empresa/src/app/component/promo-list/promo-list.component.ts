import { Component, OnInit } from "@angular/core";
import { Promo } from "src/app/model/promo";
import * as moment from "moment";
import { ApiService } from "src/app/services/api.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { DialogOverviewExampleDialog } from "../reports/reports.component";
import { PromoData } from "src/app/services/promo-data.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-promo-list",
  templateUrl: "./promo-list.component.html",
  styleUrls: ["./promo-list.component.css"]
})
export class PromoListComponent implements OnInit {
  promocoes: any;

  listPromo: Promo[] = [];
  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public store: PromoData,
    public rotas: Router
  ) {
    this.listPromo = api.promos;
  }
  ngOnInit() {
    // this.api.getPromocoes()
  }

  dataString(data): String {
    return moment(data).format("l");
  }
  editPromo(obj) {
    // alert('A ser feito');
    this.store.setPromo(obj);
    this.rotas.navigate(["/edit-promo", obj._id]);
    //  console.log(obj)
  }
  relatorio(obj) {
    alert("A ser feito");
    //  console.log(obj)
  }
  deletar(obj) {
    // alert('A ser feito')
    //  console.log(obj)
    this.openDialog(obj._id);
  }
  openDialog(_id): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      data: { _id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.api.postData("deletarpromo", { _id: result }).subscribe(res => {
        this.api.getPromocoes();
      });
    });
  }
}
