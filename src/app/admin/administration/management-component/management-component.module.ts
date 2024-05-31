import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionModule } from './version/version.module';
import { ManagementComponentComponent } from './management-component.component';
import { OrganizationFormModule } from './organization-form/organization-form.module';
import { AddOrgVersionFormModule } from './add-org-version-form/add-org-version-form.module';
import { ProductFormModule } from './product-form/product-form.module';
import { ServiceFormModule } from './service-form/service-form.module';
import { VersionFormModule } from './version-form/version-form.module';
import { UnassignOrgVersionFormModule } from './unassign-org-version-form/unassign-org-version-form.module';
import { VersionComponent } from './version/version.component';
import { UpdateOrganizationFormModule } from './update-organization-form/update-organization-form.module';

@NgModule({
  declarations: [
    ManagementComponentComponent,
  ],
  imports: [
    CommonModule,
    VersionModule,
    OrganizationFormModule,
    AddOrgVersionFormModule,
    ServiceFormModule,
    VersionFormModule,
    UnassignOrgVersionFormModule,
    ProductFormModule,
    UpdateOrganizationFormModule
  ],
  exports:[
    ManagementComponentComponent,
  ]
})
export class ManagementComponentModule { }
