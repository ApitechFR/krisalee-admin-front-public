import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule } from '@nebular/theme';
import { VersionFormComponent } from './version-form.component';


@NgModule({
  declarations: [VersionFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule
  ]
})
export class VersionFormModule { }
