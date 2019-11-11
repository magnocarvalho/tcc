import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/model/promo';
import * as moment from 'moment'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css']
})
export class PromoListComponent implements OnInit {


  promocoes: any;
  objteste: Promo = {

    _id: "5d9c1b2f6b88161b344f0eef",
    about: "dfsafsa s a fdsaf ",
    descont: 0.17117117117117117,
    endDate: moment("2019-10-10T03:00:00.000Z"),
    endPrice: 920,
    initDate: moment("2019-10-08T03:00:00.000Z"),
    initPrice: 1110,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/oficina2utfpr.appspot.com/o/promocao%2FPPmBAxtTf0PL3IHNu7WHVLrlKlv1%2Ftituoooddfsa?alt=media&token=90b441fc-96e4-4bee-a61d-8005efd873c6",
    title: "tituoooddfsa"

  }

  listPromo: Promo[] = []
  constructor(public api: ApiService) {
    this.listPromo = api.promos
  }
  ngOnInit() {
    // this.api.getPromocoes()
  }

  dataString(data): String {
    return moment(data).format('l')
  }
  editPromo(obj) {
    alert('A ser feito')
  //  console.log(obj)
  }
  relatorio(obj) {
    alert('A ser feito')
  //  console.log(obj)
  }
  deletar(obj) {
    alert('A ser feito')
  //  console.log(obj)
  }

}
