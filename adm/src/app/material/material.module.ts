import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatFormFieldModule
} from "@angular/material";

const components = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialModule {}
