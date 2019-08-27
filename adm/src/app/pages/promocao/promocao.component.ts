import { Component, OnInit } from "@angular/core";
import { FormGroup, Form, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-promocao",
  templateUrl: "./promocao.component.html",
  styleUrls: ["./promocao.component.scss"]
})
export class PromocaoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  promocao = new FormGroup({
    nome: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    pass: new FormControl("", [Validators.required, Validators.minLength(6)])
  });
}
