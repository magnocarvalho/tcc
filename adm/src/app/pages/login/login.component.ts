import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    email: new FormControl('', Validators.email),
    senha: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }
  
  fazerLogin() {
  }
  

}
