import { ServicesCredentials } from "./ServicesCredentials.entity";
import { ServicesUrl } from "./ServicesUrl.entity";

export class OrganizationEnv {
  services_url: ServicesUrl;

  services_credentials: ServicesCredentials;

  HOST_DATA_SSH_PORT: number;

  SFTP_HOST: string;

  SFTP_PORT: number;

  SFTP_USERNAME: string;

  SFTP_PASSWORD: string;

  KC_SERVICE_ADMIN_CLIENT_ID: string;

  KC_SERVICE_URL: string;

  ORG_DOMAIN: string;

  public constructor(services_url: ServicesUrl, services_credentials: ServicesCredentials, HOST_DATA_SSH_PORT: number, 
                     SFTP_HOST: string, SFTP_PORT: number, SFTP_USERNAME: string, SFTP_PASSWORD: string, 
                     KC_SERVICE_ADMIN_CLIENT_ID: string, KC_SERVICE_URL: string, ORG_DOMAIN: string){
                      
                      this.services_url = services_url;
                      this.services_credentials = services_credentials;
                      this.HOST_DATA_SSH_PORT = HOST_DATA_SSH_PORT;
                      this.SFTP_HOST = SFTP_HOST;
                      this.SFTP_PORT = SFTP_PORT; 
                      this.SFTP_USERNAME = SFTP_USERNAME;
                      this.SFTP_PASSWORD = SFTP_PASSWORD;
                      this.KC_SERVICE_ADMIN_CLIENT_ID = KC_SERVICE_ADMIN_CLIENT_ID;
                      this.KC_SERVICE_URL = KC_SERVICE_URL;
                      this.ORG_DOMAIN = ORG_DOMAIN
                     }
}
