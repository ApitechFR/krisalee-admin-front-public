import { Injectable } from '@angular/core';
import  Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';

//declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  //public kc: KeycloakInstance;
  public kc: Keycloak;
  private Keycloak_url = environment.KC_URL;
  constructor() { }

  public async init() {
    this.kc = new Keycloak({
      url: this.Keycloak_url,
      realm: environment.KC_REALM,
      clientId: environment.KC_CLIENT_ID,
    });

    try {
      await this.kc.init({
        onLoad: "login-required",
      });
    } catch (error) {
      console.error('Keycloak initialization error:', error);
    }

  }
}
