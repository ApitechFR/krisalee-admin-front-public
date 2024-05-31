import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MiscellaneousComponent } from '../pages/miscellaneous/miscellaneous.component';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { ServiceModule } from '../Components/service/service.module';
import { AdministrationModule } from './administration/administration.module';
import { AdministrationComponent } from './administration/administration.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ServiceModule,
    AdministrationModule,
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule { }