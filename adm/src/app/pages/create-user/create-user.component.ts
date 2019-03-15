import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(public auth: AuthService, public route: Router, private snackBar: MatSnackBar) { }

  form = new FormGroup({
    email: new FormControl('', Validators.email),
    senha1: new FormControl('', Validators.required),
    senha2: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required)
  });

  ngOnInit() { }
  criarLogin() {
    if (!this.form.valid) {
      this.snackBar.open('Preencha todos os campos', 'erro', {
        duration: 5000,
      });
      return;
    }
    if (!this.verificaSenhas()) {
      return;
    }
    const senhas = this.form.get('senha1').value;
    const nome = this.form.get('nome').value;
    const email = this.form.get('email').value;
    const obj = {
      email: this.form.get('email').value,
      senha: senhas,
      nome: nome
    };
    this.auth.createUser(obj).then(
      () => {
        this.snackBar.open('Verifique seu email!', 'Sucesso', {
          duration: 5000,
        });
        this.route.navigate(['primeiro-acesso']);
      },
      err => {
        const erro = err;
        this.snackBar.open(erro.message, 'erro', {
          duration: 5000,
        });
      }
    );
  }
  verificaSenhas(): boolean {
    const s1 = this.form.get('senha1').value;
    const s2 = this.form.get('senha2').value;
    if (s1 === s2) {
      return true;
    } else {
      this.snackBar.open('Senhas não conferem!', 'Erro', {
        duration: 5000,
      });
      return false;
    }
  }
}
