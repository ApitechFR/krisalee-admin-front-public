import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { NbCardModule } from '@nebular/theme';
import { ManagementComponentModule } from '../../admin/administration/management-component/management-component.module';
import { AddTagDialogComponent } from './add-tag-dialog/add-tag-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbRadioModule } from '@nebular/theme';


@NgModule({
  declarations: [
    TagsComponent,
    AddTagDialogComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ManagementComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbRadioModule
  ]
})
export class TagsModule { }
