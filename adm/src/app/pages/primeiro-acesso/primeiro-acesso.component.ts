import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {
  form;
  constructor(public api: ApiService, public router: Router) {
    this.form = new FormGroup({
      nomeFantasia: new FormControl(''),
      cnpj: new FormControl(''),
      rua: new FormControl(''),
      numero: new FormControl(''),
      cep: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl('')
    });
  }

  ngOnInit() {}
  salvarLogin() {
    const obj = {
      nomeFantasia: this.form.get('nomeFantasia').value,
      cnpj: this.form.get('cnpj').value,
      rua: this.form.get('rua').value,
      numero: this.form.get('numero').value,
      cep: this.form.get('cep').value,
      bairro: this.form.get('bairro').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value
    };
    this.api.primeiroAcesso(obj).subscribe(res => {
      this.router.navigate(['dashboard']);
    });
  }
}
