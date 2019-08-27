import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeModule } from 'theme';
import { PromocaoComponent } from './promocao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    PromocaoComponent
  ],
})
export class PromocaoModule { }
