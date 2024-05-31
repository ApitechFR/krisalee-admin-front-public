import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { StatusCardComponent } from './status-card/status-card.component';
import { TextCardComponent } from './text-card/text-card.component';
import { EchartsPieComponent } from '../../pages/charts/echarts/echarts-pie.component';
import { EchartsBarComponent } from '../../pages/charts/echarts/echarts-bar.component';
import { ConfirmModalComponent } from './status-card/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,

  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TextCardComponent, 
    EchartsPieComponent,
    EchartsBarComponent,
    ConfirmModalComponent,
  ],
})
export class DashboardModule { }
