import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorComponent } from './connector.component';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { PlanificationDialogComponent } from './planification-dialog/planification-dialog.component';
import { LaunchDialogComponent } from './launch-dialog/launch-dialog.component';
import { NbSelectModule, NbIconModule, NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogComponent } from '../log/log.component';
import { LogModule } from '../log/log.module';



@NgModule({
  declarations: [
    ConnectorComponent,
    SubComponentComponent,
    PlanificationDialogComponent,
    LaunchDialogComponent
  ],
  imports: [
    CommonModule,
    NbSelectModule,
    NbIconModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    LogModule
  ],
})
export class ConnectorModule { }
