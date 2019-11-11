import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/model/promo';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment'
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  public favoritos: Promo[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getdados()
  }

  getdados() {
    this.api.getData('favorites').subscribe(res => {
      try {
        if (res[0].promos) {
          this.favoritos = res[0].promos;
        }
      } catch (error) {
        this.favoritos = null;
      }
    })
  }
  dataString(data): String {
    return moment(data).format('l')
  }
  excluir(id) {
    this.api.putData('favorites', { id: id }).subscribe(res => {
      this.getdados()
    })
  }

}
