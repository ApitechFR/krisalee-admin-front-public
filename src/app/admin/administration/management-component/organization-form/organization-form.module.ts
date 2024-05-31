import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationFormComponent } from './organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [OrganizationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule
  ]
})
export class OrganizationFormModule { }
