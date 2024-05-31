import { Component, ErrorHandler, Input, EventEmitter, Output, OnInit, TemplateRef } from '@angular/core';
import { COSMIC_THEME, NbDialogService } from '@nebular/theme';
import { ProductService } from '../../Services/product/product.service';
import { ServicesService } from '../../Services/services/services.service';
import { LaunchDialogComponent } from '../launch-dialog/launch-dialog.component';
import { map } from 'rxjs/operators';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { SnapshotService } from '../../Services/snapshot/snapshot.service';
import { AddTAgFormComponent } from './snapshot/add-tag-form/add-tag-form.component';
import { TagType } from '../../Models/enums/tagType';
import { ConfirmModalComponent } from '../../admin/dashboard/status-card/confirm-modal/confirm-modal.component';
import { ErrorHandlerService } from '../../Services/errorHandler/error-handler.service';
import { ShowCommentComponent } from './show-comment/show-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { UpdateSnapshotDTO } from '../../Models/snapshot/update-snapshot-dto';
import { SuccessHandlerService } from '../../Services/successHandler/success-handler.service';


@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() launch = new EventEmitter();
  @Output() stop = new EventEmitter();

  /** an input for the current service */
  @Input() service: any;

  /** a list of tags used for snapshots */
  @Input() tags: any;

  /** a variable storing the Client identifier */
  organization_id: string = environment.ORGANIZATION_ID;

  /** a variable for the default product to use while launching the current service */
  product: any;

  /** a list of snapshots of a specified product */
  snapshots: any;

  /** a variable set to true while creating/launching a service */
  @Input() iscreating: boolean = false;

  /** a variable set to true while deleting/stoping a service */
  @Input() isdeleting: boolean = false;

  /** a variable storing the service status */
  @Input() service_status: boolean;

  /** the url for the service webpage */
  service_url: string;

  danger_color: boolean;

  isAdmin: boolean;

  /**
   * the chosen snpashot while launching the service
   */
  chosenSnapshot: string;

  /** service logs */
  logs: any

   /**a variable storing the active snapshot */
   ActiveSnapshot: any;


  constructor(private dialogService: NbDialogService,
     private securityService: KeycloakSecurityService, private serviceService: ServicesService,
    private snapshotService: SnapshotService, private errorhandler: ErrorHandlerService,
    private successHandler: SuccessHandlerService
    ) {

  }

  ngOnInit(): void {
    this.isAdmin = this.checkIsUserAdmin();


    // switch (this.service.name){
      //   case 'Drive':
        //     this.service_url = environment.NEXTCLOUD_URL;
        //     break;
      //   case 'Site Interne':
        //     this.service_url = environment.SITE_INTERNE_URL;
        //     break;
      //   case 'Site Externe':
        //     this.service_url = environment.SITE_EXTERNE_URL;
        //     break;
        //     case 'Authentification':
        //     this.service_url = environment.KEYCLOAK_URL;
        //     this.danger_color = true;
        //     break;
        //     case 'Mail':
        //     this.service_url = environment.MAILSERVER_URL;
        //     break;
        //     case 'Chat':
        //     this.service_url = environment.CHAT_URL;
        //     break;
      //   default:
        //     this.service_url = undefined;
        //     break;
    // }

    this.getSnapshots(this.service);
  }


  checkIsUserAdmin(){
    if(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin')){
      return true;
    }
    return false;
  }


  /**
   * a function that makes a request for getting a service's snapshots (the main service we want to launch)
   * @returns an observable
   */
   getSnapshots(service: any){
    return this.serviceService.getSnapshots(this.organization_id, service.service_id).subscribe((response) =>{
      this.snapshots = response;
      for(let snap of this.snapshots){
        if(snap.is_active)
          this.ActiveSnapshot = snap;
      }
    });
  }

  getServiceLogs(){
    this.serviceService.getLogs(this.organization_id, this.service.service_id).subscribe((response) => {
      this.logs = response;
    })

  }

/**
 * a function that makes a request for getting a service
 * @returns an observable
 */
  // getService(){
  //   const service = this.productService.GetService(this.organization_id, this.service.service_id);
  //   return service;
  // }

/**
 * a function that makes a request for getting the default product of a service (e.g: keycloak is the default for auth service)
 * @returns an observable
 */
  // getDefault(){
  //   const defaultProduct = this.productService.getDefault(this.organization_id, this.service.service_id);
  //   return defaultProduct;
  // }

/**
 * a function that makes a request for starting a service
 * @returns an observable of type Object
 */
  // startService(){
  //   const data = this.productService.StartService(this.organization_id, this.service.service_id, this.chosenSnapshot, 'mode1');
  //   return data;
  // }

  //----------------------------------------------
  //------------------Snapshots part -------------
  //----------------------------------------------

  deleteSnapshot(snapshot_id: string){
      this.dialogService.open(ConfirmModalComponent,
        {
          context: {
            content: 'Êtes-vous sûr de vouloir supprimer cette sauvegarde ?',
            Action: 'Supprimer',
            headerIcon: 'fa-trash',
          },
        }
      ).onClose.subscribe((formData) => {
        if(formData){
          this.snapshotService.deleteSnapshot(this.organization_id, snapshot_id)
          .subscribe((response) => {
            console.log(response);
            this.filterDeletedSnapshot(snapshot_id);
          }, error => {
            console.log(error);
            this.errorhandler.handleError(error);
          })
        }
      })
  }

  filterDeletedSnapshot(snapshot_id: string){
    this.snapshots = this.snapshots.filter((snapshot) =>
      snapshot.snapshot_id != snapshot_id
    )
  }
  /**
   * update the list of snaphots when it get updated after http operations
   */
  updateSnapshotsList(objects: any){
    this.snapshotService.getSnapshots(this.organization_id, this.service.service_id).subscribe(response =>{
      this.snapshots = response;
    })
    // this.snapshots = this.snapshots.find(snapshot => objects.find(object => object.snapshot_id == snapshot.snapshot_id) || snapshot)
  }


  /*  ###############
      tags management
      ###############
  */

    /**
     * assign tag to snapshot
     * @param snapshot
     */
   assignTag(snapshot: any){
    //firstly, we should filter the 'source' tag from the list if the connected user is not admin (only admin user could perfom operations on 'source' tag)
    let tags = this.tags;
    if(!(this.checkIsUserAdmin())){
      tags = tags.filter(tag => tag.type !== TagType.SOURCE || tag.type !== TagType.FAIL)
    }


    this.dialogService.open(AddTAgFormComponent,
      {
        context:{
          tags: tags,
        }
      }).onClose.subscribe((formData =>{
        if(formData){
          this.snapshotService.assignTag(this.organization_id, snapshot.snapshot_id, formData.tag_id)
            .subscribe((response) =>{
              this.handleResponse(response, snapshot.snapshot_id, formData.tag_id);
              // this.updateSnapshotsList(response);
            })
        }
      })
      );
  }

  /**
   * unassign tag to snapshot
   * @param snapshot
   * @param tag
   */
  unassignTag(event: any){
    let snapshot = event.snapshot;
    let tag = event.tag;
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: `Voulez-vous désaffecter le label ${tag.name} à cette sauvegarde ?`,
          headerIcon: 'fa-exclamation',
          Action: 'Désaffecter'
        }
      }).onClose.subscribe((formData) =>{
        if(formData){
          this.snapshotService.unassignTag(this.organization_id, snapshot.snapshot_id, tag.tag_id).subscribe((response) => {
            this.updateSnapshotsList(response);
          })
        }
      })
  }

  /**
   * a function that handles the response(because we have different use cases based on the server response)
   * @param response server/backend response
   * @param snapshot_id
   * @param tag_id
   */
  handleResponse(response: any, snapshot_id: any, tag_id: string){
    // if we tried to assign a SYSTEM TAG to a snapshot which already has a SYSTEM TAG (because a could have at most one SYSTEM TAG)
    if(response.systemTagExist){
      this.dialogService.open(ConfirmModalComponent,
        {
          context: {
            // title: 'Ce snapshot a déjà un label système',
            content: 'Cette sauvegarde a déjà un label système. Voulez-vous le remplacer ?',
            Action: 'Remplacer',
            headerIcon: 'fa-exclamation'
          }
        }).onClose.subscribe(formData =>{
              if(formData){
                this.assignTagWithForceOption(snapshot_id, tag_id);
              }
            }
          )
    }

    //else if we tried to assign a UNIQUE SYSTEM TAG to a snapshot, but this tag is already assigned to another snapshot
    else if (response.systemTagUniqueExist){
      this.dialogService.open(ConfirmModalComponent,
        {
          context: {
            // title: 'Etiquette déjà assigné à un snapshot',
            content: 'Label unique déjà assigné à une sauvegarde. Voulez-vous le faire déplacer ?',
            Action: 'Déplacer',
            headerIcon: 'fa-exclamation'
          }
        }).onClose.subscribe(formData =>{
              if(formData){
                this.assignTagWithForceOption(snapshot_id, tag_id);
              }
            }
          )
    }

    //here when we try to add some sysem unique tag to a snapshot that already has one
    else if(response.snapHasTagUnique){
      this.dialogService.open(ShowcaseDialogComponent,
        {
          context: {
            // title: 'Etiquette déjà assigné à un snapshot',
            title: 'Info',
            message: 'Vous ne pouvez pas remplacer un label système unique par un autre, il faut d\'abord retirer celui existant et réessayer à nouveau',
            color: 'blue'
          }
        }).onClose.subscribe(formData =>{
              if(formData){
                this.assignTagWithForceOption(snapshot_id, tag_id);
              }
            }
          )
    }

    else{
      console.log('success');
      //TODO add a success popup
      this.updateSnapshotsList(response);
    }
  }
/**
 * it remplaces a tag by another it they are both system tags, or it moves a unique system tag to another snapshot
 * @param snapshot_id
 * @param tag_id
 */
  assignTagWithForceOption(snapshot_id: string, tag_id: string){
    const force = true;
    this.snapshotService.assignTag(this.organization_id, snapshot_id, tag_id, force)
      .subscribe((response) =>{
        this.handleResponse(response, snapshot_id, tag_id);
      }
    )
  }


  showComment(snapshot : any){
    this.dialogService.open(ShowCommentComponent, {
      context:{
        snapshot: snapshot
      }
    }).onClose.subscribe(response =>{
      if(response && response.action === 'modifier'){

        //update snapshot's comment
        this.dialogService.open(UpdateCommentComponent,
          {context:
            {
              snapshot: snapshot
            }
          }).onClose.subscribe(formData =>{
            if(formData){
              const updateSnapshotDto = new UpdateSnapshotDTO();
              updateSnapshotDto.comment = formData.comment
              this.snapshotService.updateSnapshot(this.organization_id, snapshot.snapshot_id, updateSnapshotDto).subscribe(response =>{
                this.updateSnapshotsList(response)
                this.successHandler.handleSuccess('Vos modifications ont bien été prises en compte.')
              })
            }
        })
      }
    })
  }


}
