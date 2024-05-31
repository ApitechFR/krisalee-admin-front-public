import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserModule } from './user/user.module';
import { TablesModule } from '../../pages/tables/tables.module';
import { NbInputModule, NbCardModule, NbSpinnerModule, NbPopoverModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    NbCardModule,
    UserModule,
    TablesModule,
    NbSpinnerModule,
    FormsModule,
    NbInputModule,
    NbPopoverModule,
  ]
})
export class UsersModule { }
