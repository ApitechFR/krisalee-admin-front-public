import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getUsers(organization_id: string) {
    try {
      return this.http.get(this.apiUrl + '/organization/' + organization_id + '/user/',);
    } catch (error) {
      throw new Error(error);
    }
  }

  alertUser(organization_id: string, user_id){
    try {
      return this.http.post(this.apiUrl + '/organization/' + organization_id + '/user/' + user_id +'/alert',{
        
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
