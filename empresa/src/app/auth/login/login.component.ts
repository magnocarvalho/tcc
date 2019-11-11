import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public api: ApiService, public rotas: Router, public snack: MatSnackBar, public ngxBar: LoadingBarService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  goLogin() {
    this.ngxBar.start()
    this.api.doLogin(this.form.value).then(res => {
      this.ngxBar.increment(30)
      //  console.log(res)

    }).catch(err => {
      this.snack.open(err.message, 'erro', { duration: 5000 })
      console.error(err)
    }).finally(() => {

      this.ngxBar.complete()
    })
  }


}
