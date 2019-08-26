import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeModule } from 'theme';
import { PromocaoComponent } from './promocao.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule
  ],
  declarations: [
    PromocaoComponent
  ],
})
export class PromocaoModule { }
