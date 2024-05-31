import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Organization } from '../../Models/organization/entities/organization.entity';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private apiUrl = environment.API_URL;

  constructor( private http: HttpClient, private KeycloakSecurityService: KeycloakSecurityService) { }

  getOrganization(organization_id: string){
    try {
      return this.http.get(`${this.apiUrl}/organization/${organization_id}`);
    } catch (error) {
      throw new Error(error);
    }
  }
  getOrganizations(organization_id: string){
    try {
      return this.http.get(`${this.apiUrl}/organization/`);
    } catch (error) {
      throw new Error(error);
    }
  }

  addOrganization(organization : Organization){
    return this.http.post(this.apiUrl+'/organization/',
    organization,
    );
  }
  updateOrganization(organization : Organization){
    return this.http.patch(this.apiUrl+`/organization/${organization.organization_id}`,
    organization,
    );
  }

  deleteOrganization(organization_id: string){
    try {
      return this.http.delete(this.apiUrl + `/organization/${organization_id}`)
    } catch (error) {
      throw new Error(error);
    }
  }
}
