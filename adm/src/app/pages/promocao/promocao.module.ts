import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PromocaoComponent } from "./promocao.component";

import { ThemeModule } from "theme";

@NgModule({
  imports: [CommonModule, ThemeModule],
  declarations: [PromocaoComponent],
  exports: [PromocaoComponent]
})
export class PromocaoModule {}
