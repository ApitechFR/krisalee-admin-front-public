import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrgVersionFormComponent } from './add-org-version-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [AddOrgVersionFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule

  ]
})
export class AddOrgVersionFormModule { }
