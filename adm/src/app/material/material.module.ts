import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

const componetsMaterial = [
  CommonModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule
];
@NgModule({
  imports: componetsMaterial,
  exports: componetsMaterial
})
export class MaterialModule {}
