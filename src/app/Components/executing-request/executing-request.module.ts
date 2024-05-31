import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraComponentsModule } from '../../pages/extra-components/extra-components.module';
import { ExecutingRequestComponent } from './executing-request.component';
import {NbCardModule, NbSpinnerModule, NbProgressBarModule} from '@nebular/theme';
@NgModule({
  declarations: [ExecutingRequestComponent],
  imports: [
    CommonModule,
    ExtraComponentsModule,
    NbCardModule, 
    NbSpinnerModule,
    NbProgressBarModule
  ]
})
export class ExecutingRequestModule { }
