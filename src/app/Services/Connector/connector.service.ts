import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertLevelEnum } from '../../Models/enums/alertUsers.enum';
import { environment } from '../../../environments/environment'; 
import { RunConnectorDto } from '../../Models/connector/startConnector-dto';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient,) { }

  GetConnectors(organization_id: string) {
    try {
      return this.http.get(this.apiUrl + '/organization/' + organization_id + '/connector/',);
    } catch (error) {
      throw new Error(error);
    }
  }


  StartConnector(organization_id: string, connector_id: string, runConnectorDto: RunConnectorDto) {
    try {
      if(runConnectorDto.sms_header){
        return this.http.post(this.apiUrl+'/organization/'+organization_id+'/connector/' + connector_id + '/up',
          {
            alert_level: runConnectorDto.alert_level,
            sms_header: runConnectorDto.sms_header,
            services: runConnectorDto.services,
          },
        );
      }
      else{
        return this.http.post(this.apiUrl+'/organization/'+organization_id+'/connector/' + connector_id + '/up',
          {
            alert_level: runConnectorDto.alert_level,
            services: runConnectorDto.services,
          },
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  StopConnector(organization_id: string, connector_id: string) {
    try {
      return this.http.post(this.apiUrl+'/organization/'+organization_id+'/connector/down',{
        "connector_id":connector_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }


  getConnector(organization_id: string, connector_id: string){
    try {
      return this.http.get(this.apiUrl+'/organization/'+organization_id+'/connector/'+connector_id);
    } catch (error) {
      throw new Error(error);
    }
  }

  getLogs(organization_id: string, connector_id: string){
    return this.http.get(this.apiUrl+'/organization/'+organization_id+'/log/connector/'+connector_id);
  }
}
