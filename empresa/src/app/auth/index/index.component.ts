import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Promo } from 'src/app/model/promo';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // public promos: Promo[] = []
  constructor(public api: ApiService) {
    // api.getAllPromos().subscribe(res => {
    //   this.promos = res
    // })
  }

  ngOnInit() {
  }

}
