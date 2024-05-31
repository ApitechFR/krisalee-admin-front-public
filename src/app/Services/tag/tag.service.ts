import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createTagDTO } from '../../Models/tag/createTag-dto';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getTags(organization_id: string){
    try {
      return this.http.get(`${this.apiUrl}/organization/${organization_id}/tag`);
    } catch (error) {
      throw new Error(error);
    }
  }

  createTag(organization_id: string, createTagDto: createTagDTO){
    try {
      return this.http.post(`${this.apiUrl}/organization/${organization_id}/tag`,
        {
          name : createTagDto.name,
          description: createTagDto.description,
          system : createTagDto.system,
          unique : createTagDto.unique,
          type: createTagDto.type,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteTeg(organization_id: string, tag_id: string){
    try {
      return this.http.delete(this.apiUrl + `/organization/${organization_id}/tag/${tag_id}`)
    } catch (error) {
      throw new Error(error);
    }
  }
}
