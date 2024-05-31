import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SnapshotService } from '../../../Services/snapshot/snapshot.service';
import { NbDialogService } from '@nebular/theme';
import { ConfirmModalComponent } from '../../../admin/dashboard/status-card/confirm-modal/confirm-modal.component';
import { ErrorHandlerService } from '../../../Services/errorHandler/error-handler.service';
import { AddTAgFormComponent } from './add-tag-form/add-tag-form.component';
import { ShowcaseDialogComponent } from '../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { KeycloakSecurityService } from '../../../Keycloak-config/keycloak-security.service';
import { TagType } from '../../../Models/enums/tagType';

@Component({
  selector: 'ngx-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})

export class SnapshotComponent {
  @Input() service_id: string;
  @Input() organization_id: string;
  @Input() tags: any;
  @Input() snapshots: any;
  expanded: boolean;
  is_deleting: boolean;

  @Output() assign_tag = new EventEmitter();
  @Output() unassign_tag = new EventEmitter();
  @Output() deleteSnapshot = new EventEmitter();
  @Output() showComment = new EventEmitter();

  public constructor(
                     private securityService: KeycloakSecurityService
                     ){}

  ngOnInit(): void {
    
  }

  open(){
    this.expanded = !this.expanded;
  }

  delete(snapshot_id: string){
    this.deleteSnapshot.emit(snapshot_id);
    // this.dialogService.open(ConfirmModalComponent,
    //   {
    //     context: {
    //       content: 'Êtes-vous sûr de vouloir supprimer cette version ?',
    //       Action: 'Supprimer',
    //       headerIcon: 'fa-trash',
    //     },
    //   }
    // ).onClose.subscribe((formData) => {
    //   if(formData){
    //     this.snapshotService.deleteSnapshot(this.organization_id, snapshot_id)
    //     .subscribe((response) => {
    //       console.log(response);
    //       this.filterDeletedSnapshot(snapshot_id);          
    //     }, error => {
    //       console.log(error);
    //       this.errorhandler.handleError(error);
    //     })
    //   }
    // })
  }



  // filterDeletedSnapshot(snapshot_id: string){
  //   this.snapshots = this.snapshots.filter((snapshot) => 
  //     snapshot.snapshot_id != snapshot_id
  //   )
  // }

  /*  ###############
      tags management
      ###############
  */

    /**
     * assign tag to snapshot
     * @param snapshot 
     */
   assignTag(snapshot: any){
    this.assign_tag.emit(snapshot);
  }

  /**
   * unassign tag to snapshot
   * @param snapshot 
   * @param tag 
   */
  unassignTag(snapshot: any, tag:any){
    this.unassign_tag.emit({snapshot, tag})
  }

    /**
 * a function that checks if the connected user is admin
 * @returns true if he is, false otherwise
 */
     checkIsUserAdmin(){
      if(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin')){
        return true;
      }
      return false;
    }

}
