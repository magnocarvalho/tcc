import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import * as moment from 'moment';
import { MatChipInputEvent } from '@angular/material';
import * as $ from "jQuery";
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var jQuery;
export interface Tags {
  texto: string;
}

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
      dataCriacao: new FormControl(moment().format("L"), [Validators.required]),
      dataFinal: new FormControl(moment().format("L"), [Validators.required]),
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
  imageChangedEvent: any = '';
  croppedImage: any = '';

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


  salvar() {
    // this.api.postagemAdd('testando');
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
    let input = event.input;
    let value = event.value;
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
  onFileChange(event, i) {
    var foto = this.fotoThumb[i];
    if (event.target.files && event.target.files.length) {
      foto.file = event.target.files[0]; //jQuery('[name=' + id + ']').val();
      var reader = new FileReader();
      reader.readAsDataURL(foto.file);
      var self = this;
      self.fotoThumb[i].tipo = "thumbnail";
      reader.onload = function () {
        self.zone.run(() => {
          self.fotoThumb[i].url = reader.result;
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  }
  onFileChangeImagem(event) {
    var i = 0;
    var foto = this.fotosBlocos[i];
    if (event.target.files && event.target.files.length) {
      foto.file = event.target.files[0]; //jQuery('[name=' + id + ']').val();
      var reader = new FileReader();
      reader.readAsDataURL(foto.file);
      var self = this;
      self.fotosBlocos[i].tipo = "blog";
      reader.onload = function () {
        self.zone.run(() => {
          self.fotosBlocos[i].url = reader.result;
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  }
  onFileChangePerfil(event) {
    var i = 0;
    var foto = this.fotoPerfil[i];
    if (event.target.files && event.target.files.length) {
      foto.file = event.target.files[0]; //jQuery('[name=' + id + ']').val();
      var reader = new FileReader();
      reader.readAsDataURL(foto.file);
      var self = this;
      self.fotoPerfil[i].tipo = "thumbnail";
      reader.onload = function () {
        self.zone.run(() => {
          self.fotoPerfil[i].url = reader.result;
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  }
  verificaFoto(): boolean {
    if (this.croppedImage != null) {
      debugger;
      if (this.croppedImage.url == undefined) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }
  verificaFotoPerfil(): boolean {
    if (this.fotoPerfil.length != 0) {
      if (this.fotoPerfil[0].url == undefined) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }
  removeThumb(i) {
    this.fotoThumb.splice(i, 1);
  }
  removePerfil(i) {
    this.fotoPerfil.splice(i, 1);
  }
  removePostagem(i) {
    this.fotosBlocos.splice(i, 1);
  }
  inserirPostagem() {
    let tipoObj = this.form.get("tipoPostagem").value;
    let textObj;
    let txtSubTitulo;
    let imagemBloco;
    let obj;
    if (tipoObj == "texto") {
      if (this.form.get("textoParagrafo").value && !this.editando) {
        textObj = this.form.get("textoParagrafo").value;
        obj = { texto: textObj };
        this.form.get("textoParagrafo").setValue("");
      } else if (this.form.get("textoParagrafo").value && this.editando) {
        textObj = this.form.get("textoParagrafo").value;
        this.postagem[this.editavel] = { texto: textObj };
        this.form.get("textoParagrafo").setValue("");
        this.editando = false;
        return;
      }
    } else if (tipoObj == "imagem") {
      if (this.fotosBlocos && !this.editando) {
        imagemBloco = this.fotosBlocos;
        obj = { imagem: imagemBloco[0].url, nome: imagemBloco[0].file.name };
        this.addFotoBlog(imagemBloco[0]);
        this.removePostagem(0);
      } else if (this.fotosBlocos && this.editando) {
        imagemBloco = this.fotosBlocos;
        this.postagem[this.editavel] = {
          imagem: imagemBloco[0].url,
          nome: imagemBloco[0].file.name
        };
        this.addFotoBlog(imagemBloco[0]);
        this.removePostagem(0);
        this.editando = false;
        return;
      }
    } else if (tipoObj == "subTitulo") {
      if (this.form.get("textoSubtitulo").value && !this.editando) {
        txtSubTitulo = this.form.get("textoSubtitulo").value;
        obj = { subTitulo: txtSubTitulo };
        this.form.get("textoSubtitulo").setValue("");
      } else if (this.form.get("textoSubtitulo").value && this.editando) {
        txtSubTitulo = this.form.get("textoSubtitulo").value;
        this.postagem[this.editavel] = { subTitulo: txtSubTitulo };
        this.form.get("textoSubtitulo").setValue("");
        this.editando = false;
        return;
      }
    }
    if (obj) {
      this.postagem.push(obj);
    }
    // console.log(this.postagem);
  }
  addFotoBlog(imgBloco) {
    this.fotos.push(imgBloco);
  }


}
