import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { NbCardModule, NbRadioModule } from '@nebular/theme';
import { ProductModule } from '../product/product.module';
import { SaveSnapshotModalModule } from './save-snapshot-modal/save-snapshot-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsModalComponent } from './logs-modal/logs-modal.component';



@NgModule({
  declarations: [
    ServiceComponent,
    LogsModalComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule, 
    ReactiveFormsModule,
    ProductModule,
    NbRadioModule,
    SaveSnapshotModalModule
  ]
})
export class ServiceModule { }
