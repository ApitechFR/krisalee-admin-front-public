/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { KeycloakSecurityService } from './Keycloak-config/keycloak-security.service';
import { LaunchDialogComponent } from './Components/launch-dialog/launch-dialog.component';
import { CustomDropdownComponent } from './Components/custom-dropdown/custom-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaunchAllDialogComponent } from './Components/launch-all-dialog/launch-all-dialog.component';
import { httpRequestInterceptor } from './helpers/httpRequestInterceptor';
import { ModalOverlaysModule } from './pages/modal-overlays/modal-overlays.module';
import { NbIconModule } from '@nebular/theme';
import { ConnectorModule } from './Components/connector/connector.module';
import { ErrorHandlerService } from './Services/errorHandler/error-handler.service';
import { TagsModule } from './Components/tags/tags.module';
import { UsersModule } from './Components/users/users.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { ExecutingRequestModule } from './Components/executing-request/executing-request.module';

export function kcFactory(kcSecurity: KeycloakSecurityService) {

  return () => kcSecurity.init();

}

@NgModule({
  declarations: [AppComponent, LaunchDialogComponent, CustomDropdownComponent, LaunchAllDialogComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    NbCardModule,
    NbRadioModule,
    NbSpinnerModule,
    ModalOverlaysModule,
    NbCheckboxModule,
    NbIconModule,
    ConnectorModule,
    TagsModule,
    UsersModule,
    ExecutingRequestModule
  ],
  bootstrap: [AppComponent],
  providers: [
              {provide:APP_INITIALIZER, deps:[KeycloakSecurityService], useFactory: kcFactory, multi: true},
              {provide:HTTP_INTERCEPTORS, useClass: httpRequestInterceptor, multi: true},
              {provide: ErrorHandler, useClass: ErrorHandlerService},
            ]
})
export class AppModule {
}
