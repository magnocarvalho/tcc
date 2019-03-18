import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import * as moment from "moment";
import { MatChipInputEvent } from "@angular/material";
import * as $ from "jQuery";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { DISABLED } from "@angular/forms/src/model";
import { Observable, of } from "rxjs";

declare var jQuery;
export interface Tags {
  texto: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  form;
  hoje: Date = new Date();
  mes: Date = new Date(
    moment()
      .add(1, "month")
      .format()
  );
  isDescon = false;
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
  customCollapsedHeight = "";
  customExpandedHeight = "";
  empresa = JSON.parse(localStorage.getItem("currentUser"));
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public api: ApiService,
    private router: Router,
    private zone: NgZone
  ) {
    this.form = new FormGroup({
      titulo: new FormControl("", [
        Validators.required,
        Validators.maxLength(54)
      ]),
      dataCriacao: new FormControl(moment().format("L"), [Validators.required]),
      dataFinal: new FormControl(moment().format("L"), [Validators.required]),
      tags: new FormControl(""),
      descricao: new FormControl(""),
      isDesconto: new FormControl(false),
      preco: new FormControl(0, [Validators.max(10000), Validators.min(0)]),
      descontoPreco: new FormControl(0, [
        Validators.max(10000),
        Validators.min(0)
      ]),
      porcentagem: new FormControl({ value: 0, disabled: false }, [
        Validators.max(100),
        Validators.min(0)
      ])
    });
  }
  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  onKeydown($) {
    $.preventDefault();
    this.tag.push(this.form.get("tags").value);
    this.form.get("tags").setValue("");
  }
  selectFile($) {
    $.preventDefault();
  }
  descontoSlide($event) {
    const estado = $event.checked;
    if (estado) {
      this.form.controls.porcentagem.enable();
    } else {
      this.form.controls.porcentagem.disable();
    }
  }

  salvarPublicacao($event) {
    // this.api.postagemAdd('testando');
    // console.log(this.form.value);
    const postagem = {
      titulo: this.form.get("titulo").value,
      dataCriacao: this.form.get("dataCriacao").value,
      descricao: this.form.get("descricao").value,
      descontoPreco: this.form.get("descontoPreco").value,
      dataFinal: this.form.get("dataFinal").value,
      isDesconto: this.form.get("isDesconto").value,
      porcentagem: this.form.get("porcentagem").value,
      preco: this.form.get("preco").value,
      tags: this.tag,
      empresa: localStorage.getItem("token")
    };
    this.api.postPublicacao(postagem).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add
    // console.log(value);
    if (value) {
      this.tag.push({ texto: value });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeTag(obj): void {
    const index = this.tag.indexOf(obj);
    if (index >= 0) {
      this.tag.splice(index, 1);
    }
  }
  preRenderFunc(content: string) {
    return content.replace(/something/g, "new value"); // must return a string
  }
  addFotoBlog(imgBloco) {
    this.fotos.push(imgBloco);
  }
}
