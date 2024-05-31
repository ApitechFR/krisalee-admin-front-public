import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ModeService {
 
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getModes(){
    try {
      return this.http.get(`${this.apiUrl}/organization/mode/getAll`);
    } catch (error) {
      throw new Error(error);
    }
  }
}
