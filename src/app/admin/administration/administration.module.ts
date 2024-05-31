import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import {   NbCardModule } from '@nebular/theme';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { ManagementComponentModule } from './management-component/management-component.module';
import { VersionModule } from './management-component/version/version.module';

@NgModule({
  declarations: [
    AdministrationComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ManagementComponentModule,
    VersionModule
  ],
})
export class AdministrationModule { }
