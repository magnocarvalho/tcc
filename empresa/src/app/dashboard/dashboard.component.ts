import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario, User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public api: ApiService) {

  }

  ngOnInit() {
  }

}
