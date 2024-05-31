import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule } from '@nebular/theme';
import { ServiceFormComponent } from './service-form.component';
@NgModule({
  declarations: [ServiceFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule
  ]
})
export class ServiceFormModule { }
