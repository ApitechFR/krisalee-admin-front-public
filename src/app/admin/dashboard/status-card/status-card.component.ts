import { Component, Input } from '@angular/core';
import { ServicesService } from '../../../Services/services/services.service';
import { OrganizationsService } from '../../../Services/organizations/organizations.service';
import { serviceUpDTO } from '../../../Models/serviceUp-dto';
import { ShowcaseDialogComponent } from '../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { interval } from 'rxjs';
import { finalize, switchMap, takeWhile, timeout } from 'rxjs/operators';
import { ErrorHandlerService } from '../../../Services/errorHandler/error-handler.service';
import { KeycloakSecurityService } from '../../../Keycloak-config/keycloak-security.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { environment } from '../../../../environments/environment';
import { serviceDownDTO } from '../../../Models/serviceDown-dto';
import { SaveSnapshotModalComponent } from '../../../Components/service/save-snapshot-modal/save-snapshot-modal.component';


@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  templateUrl: './status-card.component.html',
})
export class StatusCardComponent {

  /** a variable storing the Client identifier */
  organization_id: string = environment.ORGANIZATION_ID;

  /** a variable storing the services */
  services: any;

  @Input() title: string;
  @Input() type: string;
  @Input() on: number;

  loading: boolean;
/** a variable that will be set to true when we have made a check in backend and we found some services creating/deleting and then we changed loading property to true */
  isLoadingChangedAfterCheck: boolean;
  /** a variable for admin organization */
    isAdmin: boolean;


  constructor(private serviceService: ServicesService, private dialogService: NbDialogService, private errorhandler: ErrorHandlerService, private securityService: KeycloakSecurityService) {
    //get an organization_id;
  }

  ngOnInit(): void {
    this.isAdmin = this.checkIsUserAdmin();
    this.getAllServices().subscribe((data) => {
      this.filterFrontal(data)
      if(!(this.AreServicesCreating())){
        this.checkAllStarted();
      }
      
      this.continuousCheck();
      
    });


  }

  
  checkIsUserAdmin(){
    if(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin')){
      return true;
    }
    return false;
  }

  /**
   * check every 10 seconds to see if services are still creating/deleting or not
   */
  continuousCheck(){
    interval(10*1000) // emit a value every 10 seconds
      .pipe(
      takeWhile(() => this.checkStoppedCreating()), // continue while condition is true
      switchMap(() => this.getAllServices()),
      finalize(()=>{
        this.checkAllStarted();
      })
      )
      .subscribe(response => {
        this.filterFrontal(response);
                if(!(this.AreServicesCreating())){
          this.checkAllStarted();
        }
      });
  }


  /**
   * a function that cheks if services are creating or not
   * @returns true if services are creating, false otherwise
   */
   AreServicesCreating(){
    for(let service of this.services ){
      if(service.is_creating || service.is_deleting){
        this.loading = true;
        this.isLoadingChangedAfterCheck = true;
        return true;
      }
    }
    this.loading = false;
    return false;
  }

    /**
   * a function that will make a check to see whether the emergency system is enabled('activé') or disabled('désactivé')
   */
     checkAllStarted(){
      for(let i = 0; i < this.services.length-1; i++){
        if(this.services[i].status != this.services[i+1].status){
          //configuration mode
          this.on = 2;
          return;
        }
      }
      for(let service of this.services ){
        if(service.status){
          this.on = 1;
          break;
        }
        else if(!service.status){
          this.on = 0;
          break;
        }
      }
    }


  /**
   * function that checks if services are stopped creating/deleting or not
   * @returns true if at least one service is creating/deleting, false otherwise
   */
     checkStoppedCreating(){
            for(let service of this.services ){
        if(service.is_creating || service.is_deleting){
          this.loading = true;
          this.isLoadingChangedAfterCheck = true;
          return true;
        }
      }
      if(this.isLoadingChangedAfterCheck){
        this.loading = false;
      }
      return false;
    }
   
  
/**
 * a funcion that decide which actions to do based on the survival system state (completely launched, partially..)
 * @param on 
 */
    makeAction(on: number){
      switch (on) {
        case 0:
          this.startServices();
          break;
        case 1: 
          this.stopServices();
          break;
        case 2:
          this.launchConfig();
          break;
      }
    }

  startServices() {
      this.dialogService.open(ConfirmModalComponent,
          {
            context: {
              content: 'Êtes-vous sûr de vouloir démarrer le SI de Survie ?',
              Action: 'Démarrer',
              headerIcon: 'fa-exclamation',
            },
          }
        ).onClose.subscribe((formData) => {
          if (formData) { 
            this.dialogService.open(SaveSnapshotModalComponent,
              {
                context:
                  {
                    content: 'Voulez-vous alerter par SMS les utilisateurs de niveau 0 ?',
                    headerIcon: 'fas fa-bell',
                    confirmButtonContent: 'Oui',
                    DenyButtonContent: 'Non',
                    validateButtonContent : 'valider',
                  }
              }
            ).onClose.subscribe((formData) => {
              if (formData) {
                this.loading = true;
                this.upServices(formData.answer).subscribe((data)=>{
                  this.filterFrontal(data);
                  this.loading = false;
                  this.on = 1;
                },
                error=>{
                  this.getAllServices().subscribe((data)=>{
                    this.filterFrontal(data);
                    this.loading = false;
                    this.checkAllStarted();
                    this.errorhandler.handleError(error);
                  })
                }
                );
              }
            });
          }
        });
      

  }

  /**
   * a function that we use in case we want to completely lauch the 'SI de survie' (in case we have some services not started)
   */
  launchConfig(){
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: 'Êtes-vous sûr de vouloir démarrer le SI de Survie ?',
          Action: 'Démarrer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if (formData) { 
        this.dialogService.open(SaveSnapshotModalComponent,
          {
            context:
              {
                content: 'Voulez-vous alerter par SMS les utilisateurs de niveau 0 ?',
                headerIcon: 'fas fa-bell',
                confirmButtonContent: 'Oui',
                DenyButtonContent: 'Non',
                validateButtonContent : 'valider',
              }
          }
        ).onClose.subscribe((formData) => {
          if (formData) {
            this.loading = true;
            this.upServices(formData.answer).subscribe((data)=>{
                this.filterFrontal(data);
                this.loading = false;
                this.on = 1;
            },
            error=>{
              this.getAllServices().subscribe((data)=>{
                this.filterFrontal(data);
                this.loading = false;
                this.checkAllStarted();
                this.errorhandler.handleError(error);
              })
            }
            );
          }
        })
      }
    });
  
  }

  
  /**
   * remove frontal service from services if the organization is not admin(Apitech)
   */

   filterFrontal(data: any){
    if(this.isAdmin){
      this.services = data;
    }
    else {
      this.services = data.filter(
        (service) => service.service_id !== 'frontal',
      );
    }
  }


  stopServices() {
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: 'Êtes-vous sûr de vouloir arrêter le SI de Survie ?',
          Action: 'Arrêter',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if(formData){
        this.dialogService.open(SaveSnapshotModalComponent,
          {
            context:
              {
                content: 'Voulez-vous effectuer une sauvegarde ?',
                headerIcon: 'fa-save',
                confirmButtonContent: 'Enregistrer',
                DenyButtonContent: 'Ignorer',
                validateButtonContent : 'valider',
                servicesToStop: this.getUpServices(),
              }
          }
        ).onClose.subscribe((formData) => {
          if (formData) { 
            
            this.loading = true;
            this.downServices(formData.answer, formData.comments).subscribe((data)=>{
                this.filterFrontal(data);
                this.loading = false;
                this.on = 0;
            },
            error=>{
              this.getAllServices().subscribe((data)=>{
                this.filterFrontal(data);
                this.loading = false;
                this.checkAllStarted();
                this.errorhandler.handleError(error);
              })
            }
            );
          }
        });
      }
    });
  }

  getAllServices(){
    const services = this.serviceService.GetAllServices(this.organization_id);
    return services;
  }

/**
 * a function making an http request for starting services
 * @returns an observable of type object
 */
  upServices(alert_level_0: boolean){
    const downServices = this.getDownServices();
    const serviceUpDto =new serviceUpDTO();
    serviceUpDto.alert_level_0 = alert_level_0;

    for(let service of downServices){
      serviceUpDto.services.push(
        { service_id : service.service_id,
          snapshot_id: undefined,
        }
      );
    }
    serviceUpDto.tag_id = environment.PROD_TAG_ID;
    const services = this.serviceService.StartServices(this.organization_id, serviceUpDto)
    return services;
  }

  /**
   * a function making an http request for stopping services
   * @returns an observable of type object
   */
  downServices(save_snapshot: boolean, comments: any){
    const upServices = this.getUpServices();
    const serviceDownDto = new serviceDownDTO();
    for(let service of upServices){
      serviceDownDto.services.push(
        { service_id : service.service_id,
          snapshot_id: undefined,
          save_snapshot: save_snapshot,
          comment: comments[service.service_id]
        }
      );
    }
    const services = this.serviceService.StopServices(this.organization_id, serviceDownDto,'mode1');
    return services;
  }
   /**
   *
   * @returns a list of stopped services
   */
    getDownServices(){
      const downServices = this.services.filter(service => !service.status);
      return downServices;
    }
  
  
    /**
     *
     * @returns a list of started services
     */
    getUpServices(){
      const upServices = this.services.filter(service => service.status);
      return upServices;
    }

/**
 * 
 * @param message to be shown in the UI
 */
    launchError(message: string){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Erreur',
          message : message,
        },
      });
    }
}



