import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule, NbSelectModule, NbCardModule, NbRadioModule } from '@nebular/theme';
import { SaveSnapshotModalComponent } from './save-snapshot-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SaveSnapshotModalComponent,],
  imports: [
    CommonModule,
    NbInputModule, 
    NbSelectModule,
    NbCardModule,
    FormsModule, 
    ReactiveFormsModule,
    NbRadioModule

  ]
})
export class SaveSnapshotModalModule { }
