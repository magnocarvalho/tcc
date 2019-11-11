import { Component, OnInit, ViewChild, ChangeDetectorRef, isDevMode } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";

import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { ReCaptchaV3Service, InvisibleReCaptchaComponent } from 'ngx-captcha';
import { environment } from "src/environments/environment";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: "app-create-login",
  templateUrl: "./create-login.component.html",
  styleUrls: ["./create-login.component.css"]
})
export class CreateLoginComponent implements OnInit {
  form: FormGroup;
  imagemPerfil: any = "/assets/add.png";
  arquivoImg: any;
  public sitekey: any = environment.reCAPTCHA;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;
  public badge = 'inline';
  public type = 'image';
  public theme = 'light';
  public recaptcha: any = null;
  @ViewChild('captchaElem', { static: false }) captchaElem: InvisibleReCaptchaComponent;
  constructor(
    private formBuilder: FormBuilder,
    public auth: ApiService,
    public rota: Router,
    public snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]],
      foto: [null, [Validators.required]],
      recaptchaFRM: ['']
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    try {
      var file: File = inputValue.files[0];
      // this.form.get("foto").setValue(file);
      this.arquivoImg = file;
      var myReader: FileReader = new FileReader();

      myReader.onload = e => {
        this.imagemPerfil = myReader.result;
      };
      myReader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
    }
  }

  loginFacebook() {
    this.auth.doFacebookLogin().then(res => {
      this.rota.navigate(["form-empresa"])
      this.snackBar.open("Usuario Criado com sucesso", "ok", {
        duration: 5000
      });
    }).catch(erro => {
      this.snackBar.open(erro.message, "erro", {
        duration: 3000
      });
    })
  }

  registrar() {

    if (!this.arquivoImg) {
      this.snackBar.open("Carregamento da imagem obrigatorio", "ok", {
        duration: 4000
      });
      return;
    }
    if (this.form.valid) {
      this.auth
        .doRegister(this.form.value, this.arquivoImg)
        .then(res => {
          // console.log("registro", res);
          this.snackBar.open("Email registrado com sucesso", "ok", {
            duration: 5000
          });
          this.rota.navigate(["form-empresa"]);
        })
        .catch(erro => {
          this.snackBar.open(erro.message, "ok", {
            duration: 3000
          });
        });
    } else {
      this.snackBar.open("Todos os campos são obrigatorios", "ok", {
        duration: 3000
      });
    }
  }
  execute(): void {
    this.captchaElem.execute();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
  }
  handleError() {
    this.captchaSuccess = false;
  }
  handleExpire() {
    this.captchaSuccess = false;
  }
  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  handleReady(): void {
    this.captchaIsReady = true;
    this.cdr.detectChanges();
  }
}
