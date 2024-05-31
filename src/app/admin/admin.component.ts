import { Component } from '@angular/core';
import { KeycloakSecurityService } from '../Keycloak-config/keycloak-security.service';
import { AdminConfig, AdminConfigAdminServices, AdminConfigAdminUsers, AdminConfigDataImportation, AdminConfigTags, AdminHome, AdminRoot, Root } from './admin.routes';

@Component({
  selector: 'ngx-admin',
  styleUrls: ['admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
//add a function for get administration based on organization
export class AdminComponent
{
  constructor(private securityService: KeycloakSecurityService){}
  menu =this.isUserAdmin() ?
  [
    {
      ...Root,
      //
      link: Root.getLink(),
      home: true,
    },
    {
      ...AdminHome,
      //
      link: AdminHome.getLink(),
      home: true,
    },
    {
      ...AdminConfig,
      //
      // link: ...,
      group: true,
    },
    {
      ...AdminConfigAdminServices,
      //
      link: AdminConfigAdminServices.getLink(),
    },
    {
      ...AdminConfigDataImportation,
      //
      link: AdminConfigDataImportation.getLink(),
    },
    // {
    //   ...AdminConfigTags,
    //   //
    //   link: AdminConfigTags.getLink(),
    // },

     {
      ...AdminConfigAdminUsers,
      link: AdminConfigAdminUsers.getLink(),
     },
  ] : [
    {
      ...AdminHome,
      //
      link: AdminHome.getLink(),
      home: true,
    },
    {
      ...AdminConfig,
      //
      // link: ...,
      group: true,
    },
    {
      ...AdminConfigAdminServices,
      //
      link: AdminConfigAdminServices.getLink(),
    },
    {
      ...AdminConfigDataImportation,
      //
      link: AdminConfigDataImportation.getLink(),
    },
    // {
    //   ...AdminConfigTags,
    //   //
    //   link: AdminConfigTags.getLink(),
    // },
     {
      ...AdminConfigAdminUsers,
      link: AdminConfigAdminUsers.getLink(),
     },
  ]

  isUserAdmin(){
    if(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin')){
      return true;
    }
    return false;
  }
}
