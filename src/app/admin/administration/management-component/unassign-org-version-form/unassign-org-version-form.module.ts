import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule } from '@nebular/theme';
import { UnassignOrgVersionFormComponent } from './unassign-org-version-form.component';
@NgModule({
  declarations: [
    UnassignOrgVersionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule
  ]
})
export class UnassignOrgVersionFormModule { }
