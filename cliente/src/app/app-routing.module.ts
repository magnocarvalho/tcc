import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './rotas/login/login.component';
import { PromoComponent } from './rotas/promo/promo.component';
import { NotFoundPageComponent } from './rotas/not-found-page/not-found-page.component';
import { EmpresaComponent } from './rotas/empresa/empresa.component';
import { FavoriteComponent } from './rotas/favorite/favorite.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'index', component: PromoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'empresa/:id', component: EmpresaComponent, canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
