import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotComponent } from './snapshot.component';
import { NbCardModule } from '@nebular/theme';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { AddTAgFormComponent } from './add-tag-form/add-tag-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [
    SnapshotComponent,
    SubComponentComponent,
    AddTAgFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule
    
  ],
  exports: [
    SnapshotComponent
  ]
})
export class SnapshotModule { 

}
