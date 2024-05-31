/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { KeycloakSecurityService } from './Keycloak-config/keycloak-security.service';
import { environment } from '../environments/environment';
import { ErrorHandlerService } from './Services/errorHandler/error-handler.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,
     private keycloakSecurityService : KeycloakSecurityService, private errorHandler : ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    //read the organization_id attribute and put it inside environment.ts file
    if(this.keycloakSecurityService.kc.tokenParsed.organization_id){
      environment.ORGANIZATION_ID = this.keycloakSecurityService.kc.tokenParsed.organization_id;
    }
    else{
      this.errorHandler.handleError('L\'utilisateur connecté ne fait partie à aucune organisation');
    }
  }
}
