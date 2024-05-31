import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminConfig, AdminConfigAdminServices, AdminConfigAdminUsers, AdminConfigDataImportation, AdminConfigTags, AdminHome, AdminNotFound, AdminRoot, Root } from './admin.routes';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { NotImplementedComponent } from '../pages/miscellaneous/not-implemented/not-implemented.component';
import { UsersComponent } from '../Components/users/users.component';
import { ServiceComponent } from '../Components/service/service.component';
import { ConnectorComponent } from '../Components/connector/connector.component';
import { AdministrationComponent } from './administration/administration.component';
import { TagsComponent } from '../Components/tags/tags.component';
import { AdminGuard } from '../helpers/adminGuard/adminGuard';
 
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      //
      // Admin - Not Found
      //
      {
        path: AdminNotFound.path,
        component: NotFoundComponent,
      },
      //
      // Admin - Root
      //
      {
        path: Root.path,
        component: AdministrationComponent,
        canActivate: [AdminGuard]
      },
            //
      // Admin - Home
      //
      {
        path: AdminHome.path,
        component: DashboardComponent,
      },
      //
      // Admin - Configuration
      //
      {
        path: AdminConfig.path,
        children:
        [
          {
            path: AdminConfigDataImportation.path,
            component: ConnectorComponent,
          },
          {
            path: AdminConfigAdminServices.path,
            component: ServiceComponent,
          },
          {
            path:  AdminConfigAdminUsers.path,
            component: UsersComponent,
          },
          // {
          //   path:  AdminConfigTags.path,
          //   component: TagsComponent,
          // }
        ]
      },
      //
      // Default Route
      //
      { path: '', redirectTo: AdminHome.path, pathMatch: 'full' },
      //
      // Non-handled Route
      //
      { path: '**', redirectTo: AdminNotFound.path },
      //
      // Non-handled Route (ALTERNATIVE, WORKING HERE (but not in app-routing))
      //
      // { path: '**', component: NotFoundComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
