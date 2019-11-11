import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiService, public snack: MatSnackBar, public rota: Router) { }

  ngOnInit() {
  }

  loginFacebok() {
    this.api.doFacebookLogin().then((res) => {

      this.snack.open(`${res.user.displayName}, Seja bem vindo, seu login realizado com sucesso `, 'done', { duration: 5000 })
      this.rota.navigate(['index'])
    })
      .catch(e => {
        this.snack.open(e.code, 'done', { duration: 5000 })
      })
  }
  loginGoogle() {
    this.api.doGoogleLogin().then((res) => {
      this.snack.open(`${res.user.displayName}, Seja bem vindo, seu login realizado com sucesso `, 'done', { duration: 5000 })
      this.rota.navigate(['index'])
    })
      .catch(e => {
        this.snack.open(e.code, 'done', { duration: 5000 })
      })
  }
  loginTwitter() {
    this.api.doTwitterLogin().then((res) => {
      this.snack.open(`${res.user.displayName}, Seja bem vindo, seu login realizado com sucesso `, 'done', { duration: 5000 })
      this.rota.navigate(['index'])
    })
      .catch(e => {
        this.snack.open(e.code, 'done', { duration: 5000 })
      })
  }

}
