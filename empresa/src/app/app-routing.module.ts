import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundPageComponent } from "./auth/not-found-page/not-found-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CreateLoginComponent } from "./auth/create-login/create-login.component";
import { InfosEmpresaComponent } from './auth/infos-empresa/infos-empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuard } from './guard/dashboard.guard';
import { AuthGuard } from './guard/auth.guard';
import { FormGuard } from './guard/form.guard';
import { IndexComponent } from './auth/index/index.component';
import { NewPromoComponent } from './component/new-promo/new-promo.component';
import { ReportsComponent } from './component/reports/reports.component';
import { PromoListComponent } from './component/promo-list/promo-list.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'index', component: IndexComponent
  },
  { path: "register", component: CreateLoginComponent },
  {
    path: "adm", component: DashboardComponent, canActivate: [AuthGuard]
  },
  { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
  { path: "promo-list", component: PromoListComponent, canActivate: [AuthGuard] },
  { path: "edit-profile", component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'new-promo', component: NewPromoComponent, canActivate: [AuthGuard] },
  { path: "landpage", component: LandingPageComponent },
  { path: "form-empresa", component: InfosEmpresaComponent },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
