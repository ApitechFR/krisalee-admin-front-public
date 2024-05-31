import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateOrganizationFormComponent } from './update-organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [UpdateOrganizationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule
  ]
})
export class UpdateOrganizationFormModule { }
