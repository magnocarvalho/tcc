import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    email: new FormControl('', Validators.email),
    senha: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }
  criarLogin(){}
}
