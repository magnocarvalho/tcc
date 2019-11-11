import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from 'ngx-captcha';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CurrencyMaskModule } from "ng2-currency-mask";
//flexlayout Module
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Material Components
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
// for HttpClient import:
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
// for Router import:
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
// for Core import:
import { LoadingBarModule } from "@ngx-loading-bar/core";
// firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";

// 
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
// conmponents
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { CreateLoginComponent } from "./auth/create-login/create-login.component";
import { ProdutoComponent } from "./form/produto/produto.component";
import { NotFoundPageComponent } from "./auth/not-found-page/not-found-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { InfosEmpresaComponent } from './auth/infos-empresa/infos-empresa.component';
import { AgmCoreModule } from '@agm/core';
import { LocationService } from './services/location.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './auth/index/index.component';
import { NewPromoComponent } from './component/new-promo/new-promo.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ApiService } from './services/api.service';
import { MenuComponent } from './dashboard/menu/menu.component';
import { PromoListComponent } from './component/promo-list/promo-list.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    CreateLoginComponent,
    ProdutoComponent,
    NotFoundPageComponent,
    LandingPageComponent,
    InfosEmpresaComponent,
    DashboardComponent,
    IndexComponent,
    NewPromoComponent,
    ReportsComponent,
    MenuComponent,
    PromoListComponent,
    EditProfileComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AgmCoreModule.forRoot({
      apiKey: environment.googlemaps,
      language: 'pt-BR',
      libraries: ['places', 'geometry']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    NgxCaptchaModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    ImageCropperModule,
    CurrencyMaskModule],
  providers: [LocationService, ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
