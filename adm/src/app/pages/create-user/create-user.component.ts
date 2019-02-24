import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  constructor(public auth: AuthService, public route: Router) {}

  form = new FormGroup({
    email: new FormControl("", Validators.email),
    senha: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required)
  });

  ngOnInit() {}
  criarLogin() {
    var obj = {
      email: this.form.get("email").value,
      senha: this.form.get("senha").value
    };
    this.auth.createUser(obj).then(
      () => {
        console.log("deu bom!!!");
        this.route.navigate(["dashboard"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
