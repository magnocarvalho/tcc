import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "logout", component: LogoutComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
