import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import * as moment from "moment";
import { Promo } from "src/app/model/promo";
import "moment/locale/pt-br";
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";
import { priceValidator } from "src/app/validator/priceValidator";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { PromoData } from "src/app/services/promo-data.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-editar-promo",
  templateUrl: "./editar-promo.component.html",
  styleUrls: ["./editar-promo.component.css"]
})
export class EditarPromoComponent implements OnInit {
  form: FormGroup;
  imageChangedEventThumb: any = "";
  @ViewChild("cropthumb", { static: false })
  imageCropper: ImageCropperComponent;
  day = moment();
  mes = moment().add(1, "months");
  fotoThumb: String;
  fotoThumbAplicado = false;
  imagemPerfil: any = "/assets/img500x.png";
  valorMenor: Number = 0;
  uid: String;
  descont: Number = 0;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    public rota: Router,
    public store: PromoData,
    public snackbar: MatSnackBar
  ) {
    api.user.subscribe(res => {
      this.uid = res.uid;
    });
    this.form = this.formBuilder.group(
      {
        title: [
          store.storage.title,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ]
        ],
        about: [
          store.storage.about,
          [Validators.required, Validators.minLength(2)]
        ],
        initPrice: [
          store.storage.initPrice,
          [Validators.required, Validators.min(1)]
        ],
        endPrice: [
          store.storage.endPrice,
          [Validators.required, Validators.min(1)]
        ],
        initDate: [store.storage.initDate, [Validators.required]],
        endDate: [store.storage.endDate, [Validators.required]],
        thumbnail: [store.storage.thumbnail, [Validators.required]],
        descont: [
          { value: store.storage.descont, disabled: true },
          [Validators.required]
        ]
      },
      {
        validators: priceValidator("initPrice", "endPrice", "descont")
      }
    );
    this.imagemPerfil = store.storage.thumbnail;
  }

  ngOnInit() {
    moment.locale("pt-br");
  }
  consultDescont(): String {
    const tmp =
      (this.form.get("initPrice").value - this.form.get("endPrice").value) /
      this.form.get("initPrice").value;
    if (tmp) {
      const mmm = parseFloat("" + tmp * 100).toFixed(2);
      this.form.get("descont").setValue(mmm);
      this.descont = tmp;
      const retorno = parseFloat(mmm) + "%";
      return retorno;
    } else {
      return "Porcentagem Invalida";
    }
  }

  fileChangeEventThumb(event: any): void {
    this.imageChangedEventThumb = event;
  }
  onFileChange(event: ImageCroppedEvent) {
    if (event.base64) {
      this.fotoThumb = event.base64;
    }
  }
  removeThumb() {
    this.fotoThumbAplicado = false;
    this.fotoThumb = null;
  }

  aplicarFotoThumb() {
    this.fotoThumbAplicado = true;
  }
  retirarFotoThumb() {
    this.fotoThumbAplicado = false;
    this.fotoThumb = null;
    this.imageChangedEventThumb = null;
  }
  rotateLeft(e) {
    e.preventDefault();
    this.imageCropper.rotateLeft();
  }
  rotateRight(e) {
    e.preventDefault();
    this.imageCropper.rotateRight();
  }
  flipHorizontal(e) {
    e.preventDefault();
    this.imageCropper.flipHorizontal();
  }
  flipVertical(e) {
    e.preventDefault();
    this.imageCropper.flipVertical();
  }

  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  async salvar() {
    const tmp: Promo = this.form.value;
    tmp.descont = this.descont;
    if (!tmp.thumbnail && this.fotoThumb && tmp.title) {
      this.api.uploadFoto(this.fotoThumb, this.uid, tmp.title).then(ress => {
        tmp.thumbnail = ress;
        this.form.get("thumbnail").setValue(ress);
        this.enviarFormServidor(tmp);
      });
    } else {
      if (!this.form.valid) {
        return;
      } else {
        if (tmp.thumbnail) {
          this.enviarFormServidor(tmp);
        }
      }
    }
  }

  enviarFormServidor(tmp: Promo) {
    //  console.log(tmp)
    if (this.form.valid) {
      this.api.promoPut(tmp).subscribe(res => {
        //  console.log(res)
        this.rota.navigate(["promo-list"]);
      });
    } else {
      this.snackbar.open("Formulario com dado(s) invalido(s)");
    }
  }
}
