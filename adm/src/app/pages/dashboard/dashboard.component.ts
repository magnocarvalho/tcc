import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  form;

  categorias = [];
  tag: Tags[] = [];
  fotos: any[] = [];
  fotoThumb: any[] = [{}];
  fotosBlocos: any[] = [{}];
  fotoPerfil: any[] = [{}];
  step = 0;
  postagem = [];
  textoP = "";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  blog;
  htmlContent;
  configuracao = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "200",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    fontSize: "20px",
    fontSizePopover: "16px",
    placeholder: "Texto aqui..",
    imageEndPoint: "",
    toolbar: [
      ["bold", "italic", "underline"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
      ["link", "unlink"]
    ]
  };
  editando = false;
  editavel;
  toRemove;

  customCollapsedHeight: string = '';
  customExpandedHeight: string = '';

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public api: ApiService, private router: Router, private zone: NgZone) {
    this.form = new FormGroup({
      // "empresa": new FormControl('', [Validators.required]),
      titulo: new FormControl("", [Validators.required]),
      subtitulo: new FormControl(""),
      dataCriacao: new FormControl(moment().format("L"), [Validators.]),
      dataPublicacao: new FormControl(moment().format("L"), [ValidateDate]),
      publicado: new FormControl(""),
      bgtitulo: new FormControl(""),
      blocos: new FormControl(""),
      autorSobre: new FormControl(""),
      tags: new FormControl(""),
      autor: new FormControl("", [Validators.required]),
      thumbnail: new FormControl(""),
      imgAutor: new FormControl(""),
      url: new FormControl("", [Validators.required]),
      resumo: new FormControl(""),
      textoParagrafo: new FormControl(""),
      textoSubtitulo: new FormControl(""),
      tipoPostagem: new FormControl(""),
      IdCategoria: new FormControl(),
      isDestaque: new FormControl()
    });

  }
  salvar() {
    this.api.postagemAdd('testando');
  }
}
