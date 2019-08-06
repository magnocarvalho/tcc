import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './layout/menu/menu.component';

@NgModule({
  declarations: [AppComponent, MainComponent, LogoutComponent, LoginComponent, HeaderComponent, FooterComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
