import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { AdminHome, AdminNotFound, AdminRoot } from './admin/admin.routes';
import { NotImplementedComponent } from './pages/miscellaneous/not-implemented/not-implemented.component';

export const routes: Routes = [
  //
  // Admin Route
  //
  {
    path: AdminRoot.path,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  //
  // Auth Route
  //
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  //
  // Default Route
  //
  { path: '', redirectTo: AdminRoot.path, pathMatch: 'full' },
  //
  // Non-handled Route
  //
  { path: '**', redirectTo: 'admin/404' },
  //
  // Non-handled Route (/!\ NOT WORKING - BUG ? /!\)
  //
  // { path: '**', component: NotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
