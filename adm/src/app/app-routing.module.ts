import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateUserComponent } from "./pages/create-user/create-user.component";
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: "auth", component: CreateUserComponent },
  { path: "login", component: AppComponent },
  { path: "dashboard", component: DashboardComponent , canActivate: [AuthGuard] },
  { path: "**", redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
