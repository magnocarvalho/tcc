import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user: User;
  public loadingDados: Boolean = false;
  constructor(public api: ApiService) {
    // this.user = api.getUserDados;
    api.user.subscribe(user => {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        this.loadingDados = true;
      }
    });
  }

  ngOnInit() {
  }

}
