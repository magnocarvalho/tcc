import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeModule } from 'theme';
import { PromocaoComponent } from './promocao.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [
    PromocaoComponent
  ],
})
export class PromocaoModule { }
