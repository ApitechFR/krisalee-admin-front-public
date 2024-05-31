import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { environment } from '../../../environments/environment';
import { serviceUpDTO } from '../../Models/serviceUp-dto';
import { ServiceDTO } from '../../Models/serviceAdd-dto';
import { serviceDownDTO } from '../../Models/serviceDown-dto';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = environment.API_URL;


  constructor(private http: HttpClient, private KeycloakSecurityService: KeycloakSecurityService) { }

  addNewService(organization_id: string, serviceDto: ServiceDTO) {
    try {
      return this.http.post(this.apiUrl + `/organization/${organization_id}/service`,
      {
        service_id: serviceDto.service_id, //TODO check if we need to ask for service_id or we generate someone automatically..
        name: serviceDto.name,
        description: serviceDto.description
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteService(organization_id: string, service_id: string){
    try {
      return this.http.delete(this.apiUrl + `/organization/${organization_id}/service/${service_id}`)
    } catch (error) {
      throw new Error(error);
    }
  }

  GetAllServices(organization_id: string) {
    try {
      return this.http.get(this.apiUrl + '/organization/' + organization_id + '/service/',);
    } catch (error) {
      throw new Error(error);
    }
  }

  StartServices(organization_id: string, serviceUpdto: serviceUpDTO) {
    try {
      if(serviceUpdto.mode_id){
        return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/up',
        {
          "services": serviceUpdto.services,
          "mode_id": serviceUpdto.mode_id
        }
        );
      }
      else{
        return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/up',
        {
          "services": serviceUpdto.services,
        }
        );
      }

    } catch (error) {
      throw new Error(error);
    }

  }


  StopServices(organization_id: string, serviceDowndto: serviceDownDTO, mode_id: string) {
    try {
      return this.http.post(this.apiUrl + '/organization/' + organization_id + '/service/down',
        {
          "mode_id": mode_id,
          "services": serviceDowndto.services,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // getAllSnapshots(organization_id: string){
  //   try {
  //     return this.http.get(this.apiUrl+'/organization/'+organization_id+'/service/'+service_id+'/snapshot');
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }


  /*-------------------------------
   operation for a specific service
  ---------------------------------*/


  getSnapshots(organization_id: string, service_id: string){
    try {
      return this.http.get(this.apiUrl+'/organization/'+organization_id+'/service/'+service_id+'/snapshot');
    } catch (error) {
      throw new Error(error);
    }
  }

  StartService(organization_id: string, serviceUpdto: serviceUpDTO) {
    try {
      return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/up',
        {
          "services": serviceUpdto.services,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }


  StopService(organization_id: string, serviceDownDto: serviceDownDTO) {
    try{
      return this.http.post(this.apiUrl + '/organization/' + organization_id + '/service/down',
        {
          "services": serviceDownDto.services
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  GetService(organization_id: string, service_id: string) {
    try {
      return this.http.get(this.apiUrl + '/organization/' + organization_id + '/service/' + service_id);

    } catch (error) {
      throw new Error(error);
    }
  }


  purgeSnapshots(organization_id: string){
    return this.http.delete(this.apiUrl+'/organization/'+organization_id+'/snapshot/purge/AllSnapshots');
  }

  importSnapshots(organization_id: string){
    return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/reviveSnapshots',
    {

    });
  }

  /*-------------------------------
   Logs management
  ---------------------------------*/

  /**
   * a function that fetch the logs from backend api for a specific service
   * @param organization_id
   * @param service_id
   * @returns
   */
  getLogs(organization_id: string, service_id: string){
    return this.http.get(this.apiUrl+'/organization/'+organization_id+'/log/service/'+service_id);
  }

  /**
   * a function that fetch the logs from backend api for all services
   * @param organization_id
   * @returns
   */
  getServicesLogs(organization_id: string){
    return this.http.get(this.apiUrl+'/organization/'+organization_id+'/log/service/');
  }

  //##################################
  // ### RENEWING SSL CERTIFICATES ###
  //##################################

  renewSSL(organization_id: string){
    return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/renewSSL/',{

    });
  }
}


