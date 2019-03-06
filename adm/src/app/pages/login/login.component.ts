import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, public route: Router, private snackBar: MatSnackBar) {}

  form = new FormGroup({
    email: new FormControl("", Validators.email),
    senha: new FormControl("", Validators.required)
  });

  ngOnInit() {}

  fazerLogin() {
    var obj = {
      email: this.form.get("email").value,
      senha: this.form.get("senha").value
    };
    this.auth.login(obj).then(
      () => {
        console.log("deu bom!!!");
        this.route.navigate(["dashboard"]);
      },
      err => {
        console.log(err);
        var erro = err;
        debugger;
        this.snackBar.open(erro.message, "erro" , {
          duration: 5000,
        });
      }
    );
  }
}
