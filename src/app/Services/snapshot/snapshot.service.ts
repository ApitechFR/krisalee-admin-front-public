import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateSnapshotDTO } from '../../Models/snapshot/update-snapshot-dto';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  private apiUrl = environment.API_URL;


  constructor(private http: HttpClient,) { }




  getSnapshots(organization_id: string, service_id: string){
    try {
      return this.http.get(this.apiUrl+'/organization/'+organization_id+'/service/'+service_id+'/snapshot');
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteSnapshot(organization_id: string, snapshot_id: string){
    return this.http.delete(this.apiUrl+'/organization/'+organization_id+'/snapshot/'+snapshot_id);
  }

  updateSnapshot(organization_id: string, snapshot_id, updateSnapshotDto: UpdateSnapshotDTO){
    try {
      return this.http.patch(this.apiUrl+'/organization/'+organization_id+'/snapshot/'+snapshot_id,
          updateSnapshotDto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /*  ###############
      tags management
      ###############
  */

  assignTag(organization_id: string, snapshot_id: string, tag_id: string, force?: boolean){
    return this.http.patch(`${this.apiUrl}/organization/${organization_id}/snapshot/${snapshot_id}/addTag/${tag_id}`,
      {
        force,
      }
    );
  }

  unassignTag(organization_id: string, snapshot_id: string, tag_id: string){
    return this.http.patch(`${this.apiUrl}/organization/${organization_id}/snapshot/${snapshot_id}/deleteTag/${tag_id}`,
    {

    }
    );
  }
}
