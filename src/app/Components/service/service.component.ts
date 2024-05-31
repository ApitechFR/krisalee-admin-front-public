import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { serviceUpDTO } from '../../Models/serviceUp-dto';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { ServicesService } from '../../Services/services/services.service';
import { LaunchAllDialogComponent } from '../launch-all-dialog/launch-all-dialog.component';
import { interval } from 'rxjs';
import { finalize, switchMap, takeWhile, timeout } from 'rxjs/operators';
import { LaunchDialogComponent } from '../launch-dialog/launch-dialog.component';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { ErrorHandlerService } from '../../Services/errorHandler/error-handler.service';
import { ConfirmModalComponent } from '../../admin/dashboard/status-card/confirm-modal/confirm-modal.component';
import { environment } from '../../../environments/environment';
import { SaveSnapshotModalComponent } from './save-snapshot-modal/save-snapshot-modal.component';
import { serviceDownDTO } from '../../Models/serviceDown-dto';
import { TagService } from '../../Services/tag/tag.service';
import { ModeService } from '../../Services/mode/mode.service';
import { LogsModalComponent } from './logs-modal/logs-modal.component';
import { ObservableService } from '../../Services/observable/observable.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  /** a variable storing the Client identifier */
  organization_id: string;

  /** a variable storing the services */
  services: any;

  /** a variable used to disable 'Demarrer tout' button, set to true while creating/launching a service */
  iscreating: boolean;

    /** a variable used to disable 'Arreter tout' button, set to true while deleting/stoping a service */
  isdeleting: boolean;

  //a variable to check whether all service started or not
  allStarted: boolean ;

  /** a variable storing the list of down services */
  downServices: any;

  /** a variable for admin organization */
  isAdmin: boolean;
/** a variable containing the list of tags */
  tags: any;

  /** a variable containing the list of modes */
  modes: any;

  /** a variable holding the services logs */
  logs: any;



  constructor(
    private menuService: NbMenuService,
    private serviceService: ServicesService,
    private dialogService: NbDialogService,
    private securityService: KeycloakSecurityService,
    private errorhandler: ErrorHandlerService,
    private tagService: TagService,
    private modeService: ModeService,
    private observableService: ObservableService) { }

  ngOnInit(): void {
    this.organization_id = environment.ORGANIZATION_ID;
    this.isAdmin = this.checkIsUserAdmin();
    this.ObserveEvents();
    this.getTags();
    // this.getModes();
    this.getServicesLogs();
    this.getServices().subscribe((data) => {
      this.filterFrontal(data);
      //check if services are creating/deleting, if so skip and wait them untill they done in interval function (allStarted is about whether to show 'Demarrer tout' or 'Arreter tout')
      if(!(this.checkAreCreating())){
        this.checkAllStarted();
      }

      this.periodicCheck();
    }, error => {
      this.errorhandler.handleError(error);
    });

  }

  /**
   * a function that await for events like launching and stopping services (used for synchronization)
   */
  ObserveEvents(){
    this.observableService.headerEvent.subscribe((state) => {
      if(state =='on'){
        this.sendAreCreatingEvent();
        this.iscreating = true;
      }
      else if(state == 'done'){
        this.getServices().subscribe((data) => {
          this.filterFrontal(data);
          if(!(this.checkAreCreating())){
            this.checkAllStarted();
          }
        })
      }
      else if (state =='stop'){
        this.sendAreDeletingEvent();
        this.isdeleting = true;
      }
    });
  }

  async launchAll(){
      this.downServices = this.getDownServices();
      const services = this.downServices;

      // here we will append the snapshots to to their associated services
      await this.appendSnapshotsToServices(services);

      // this.dialogService.open(ConfirmModalComponent,
      //   {
      //     context: {
      //       content: 'Êtes-vous sûr de vouloir démarrer le SI de Survie ?',
      //       Action: 'Démarrer',
      //       headerIcon: 'fa-exclamation',
      //     },
      //   }
      // )
      this.dialogService.open(LaunchAllDialogComponent,
          {
            context: {
              services: this.downServices,
              tags: this.tags,
              // snapshots: this.snapshots,
            },
          }
        )
      .onClose.subscribe((formData) => {
        if (formData) {
          this.startservices(formData).subscribe((data)=>{
            this.replaceObjects(data);
            this.iscreating = false;
            this.allStarted = true;
            // send list of services updated
            this.observableService.emitServicesChangedFromServicespage(this.services);
          }
          , error=>{
            this.getServices().subscribe((data)=>{
              this.filterFrontal(data);
              this.iscreating = false;
              this.allStarted = false;
              // send list of services updated
              this.observableService.emitServicesChangedFromServicespage(this.services);
              this.errorhandler.handleError(error);
            },error=>{
              this.services.map((service) =>{
                return {...service, is_creating : false};
              })
              this.iscreating = false;
              this.allStarted = false;
              // send list of services updated
              this.observableService.emitServicesChangedFromServicespage(this.services);
              this.errorhandler.handleError(error);
            })
          }
          );
         }
      });
      // setTimeout(()=>location.reload(), 1000);

  }

  stopAll(){
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
                downManyServices: true,
                confirmButtonContent: 'Enregistrer',
                DenyButtonContent: 'Ignorer',
                validateButtonContent : 'valider',
                servicesToStop: this.getUpServices(),
              }
          }
        ).onClose.subscribe((formData) => {
          if (formData) {
            //retrieve the answer form the pop-up
            const save_snapshot: boolean = formData.answer;
            this.isdeleting = true;

            // send is_deleting input to childs
            this.sendAreDeletingEvent();
            // send list of services updated
            this.observableService.emitServicesChangedFromServicespage(this.services);

            this.stopServices(save_snapshot,formData.comments).subscribe((data)=>{
              this.replaceObjects(data);
              // this.getServices().subscribe((data)=>{
                // this.filterFrontal(data)
                this.isdeleting = false;
                this.allStarted = false;
                // send list of services updated
                this.observableService.emitServicesChangedFromServicespage(this.services);
              // })
            },
             error=>{
              this.getServices().subscribe((data)=>{
                this.filterFrontal(data);
                this.isdeleting = false;
                this.allStarted = true;
                // send list of services updated
                this.observableService.emitServicesChangedFromServicespage(this.services);
                this.errorhandler.handleError(error)
              },error=>{
                this.services.map((service) =>{
                  return {...service, is_deleting : false};
                })
                this.isdeleting = false;
                this.allStarted = true;
                // send list of services updated
                this.observableService.emitServicesChangedFromServicespage(this.services);
                this.errorhandler.handleError(error);
              })
            }
            );

          }})
      }
    })
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


/**
 *
 * @returns Observable of sorted services
 */
  getServices(){
    const services = this.serviceService.GetAllServices(this.organization_id).pipe(
      map((data: any[]) => {
        // Triez les services par ordre alphabétique en utilisant la fonction sort()
        return data.sort((serviceA, serviceB) => serviceA.name.localeCompare(serviceB.name));
      })
    );
    return services;
  }

/**
 * a function that makes a request for starting services
 * @returns Observable of type Object
 */

  startservices(formContent: any){
    const tag = formContent.mode_lancement;
    const serviceUpDto = new serviceUpDTO();
      this.iscreating = true;

      //check if tag is system so we have only to specify the tag_id in the query
      if(tag.tag_id !== 'personnalisé_1698230866208'){
        //send is creating trigger to childs
        this.sendAreCreatingEvent();
        if(tag.tag_id == environment.PROD_TAG_ID)
          serviceUpDto.alert_level_0  = formContent.alert_level_0;
        serviceUpDto.services = [];
        serviceUpDto.tag_id = tag.tag_id;
      }

      // if(tag.tag_id === environment.PROD_TAG_ID){
      //   //send is creating trigger to childs
      //   this.services = this.services.map((service) =>{
      //     return {...service, is_creating : true};
      //   })
      //   serviceUpDto.alert_level_0  = formContent.alert_level_0;
      //   serviceUpDto.services = [];
      // }
      // else if(tag.tag_id ==='Configuration_1692241153270'){
      else{
        let services_to_launch_with_snapshots = formContent.services_to_launch;

        // here we will filter(remove) the services that that are not checked in the form
        services_to_launch_with_snapshots = services_to_launch_with_snapshots.filter(service_with_snapshot => service_with_snapshot.checked !==false);
        //here we get the services ids to which we will send the is_creating event
        const services_to_launch_ids = services_to_launch_with_snapshots.map(service_with_snap => service_with_snap.service.service_id)
        //send is creating trigger to childs
        this.services = this.services.map((service) =>{
            if(services_to_launch_ids.includes(service.service_id)){
              return {...service, is_creating : true};
            }
            else{
              return {...service, is_creating: false}
            }
        })

        for(let service_with_snapshot of services_to_launch_with_snapshots){
          serviceUpDto.services.push(
            { service_id : service_with_snapshot.service.service_id,
              snapshot_id: service_with_snapshot.snapshot
            }
          );
        }
        // serviceUpDto.tag_id = undefined;
      }

      // send list of services updated
      this.observableService.emitServicesChangedFromServicespage(this.services);
    const data = this.serviceService.StartServices(this.organization_id, serviceUpDto);
    return data;
  }

  /**
  * a function that makes a request for stopping services
  * @returns Observable of type Object
  */
  stopServices(save_snapshot: boolean, comments: any){
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
    const data = this.serviceService.StopServices(this.organization_id, serviceDownDto, 'mode1');
    return data;
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

  launchSuccess(message: string){
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Success',
        message : message,
      },
    });
  }

/**
 * check every 10 seconds to see if services are still creating/deleting or not
 */
  periodicCheck(){
    interval(10*1000)
    .pipe(
    takeWhile(() => this.checkAreCreating()), // continue while condition is true
    switchMap(() => this.getServices()),
    finalize(()=>{
      this.checkAllStarted();
    })
    )
    .subscribe(response => {
      this.filterFrontal(response);
      if((!(this.checkAreCreating()))){
        this.checkAllStarted();
      }
      // this.services = response;
    });
  }

  /**
   * a function that checks if services are creating or not
   */
  checkAreCreating(){
    //and here we put our logic that checks whether some of the services are creating
    for(let service of this.services ){
      if(service.is_creating || service.is_deleting){
        this.iscreating = true;
        this.isdeleting = true;
        return true;
      }
    }
    this.iscreating = false;
    this.isdeleting = false;
    return false
  }
  /**
   * a function that will make a check to decide whether to show 'Demarrer tout' or 'Arreter tout' buttons
   */
  checkAllStarted(){
    for(let service of this.services){
      if(!service.status){
        this.allStarted = false;
        break
      }
      else if(service.status){
        this.allStarted = true;
        break;
      }
    }
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

  // Function to sort services alphabetically based on serviceName
  sortServicesAlphabetically(services: any): any {
    return services.sort((a, b) => a.name.localeCompare(b.name));
  }


  replaceObjects(objects: any){
    this.services = this.services.map(service => objects.find(o => o.service_id === service.service_id) || service);
  }




  /*-------------------------------
   operation for a specific service
  ---------------------------------*/


  launchService(service: any, service_Snapshots: any){
    let neededServices = this.services.filter((element) => service.depends_on.includes(element.service_id));
      this.dialogService.open(LaunchDialogComponent,
        {
          context: {
            service: service,
            snapshots: service_Snapshots,
          },
        }
      ).onClose.subscribe((formData) => {
        if (formData) {
          this.iscreating = true;
          this.isdeleting = true;
          //add the main service we want to start two its needed services
          let neededServicesWithMain = [...neededServices, service];

          if(neededServicesWithMain){
            this.changeServiceAreCreating(neededServicesWithMain, true);
          }

          const chosenSnapshot = formData.snapshot;
          //send event for the actual state of services
          this.observableService.emitServicesChangedFromServicespage(this.services);

          this.startService(service.service_id, chosenSnapshot)
            .subscribe((data)=>{
              this.replaceObjects(data);
                  if(!(this.checkAreCreating())){
                    this.checkAllStarted();
                  };
                  //send event for the actual state of services
                  this.observableService.emitServicesChangedFromServicespage(this.services);
                  this.iscreating = false;
                  this.isdeleting = false;
          }
          ,error=>{
            this.getServices().subscribe((response) => {
              this.filterFrontal(response);
              this.iscreating = false;
              this.isdeleting = false;
              //send event for the actual state of services
              this.observableService.emitServicesChangedFromServicespage(this.services);
              this.errorhandler.handleError(error);
            }, error =>{
              this.errorhandler.handleError(error);
            })
          }
          );
        }
      });
  }

  stopService(service: any) {
    this.dialogService.open(SaveSnapshotModalComponent,
      {
        context:
          {
            content: 'Voulez-vous effectuer une sauvegarde ?',
            headerIcon: 'fa-save',
            confirmButtonContent: 'Enregistrer',
            DenyButtonContent: 'Ignorer',
            validateButtonContent : 'valider',
            servicesToStop: [service],
          }
      }
    ).onClose.subscribe((formData) => {
      if (formData){
        //retrieve the answer form the pop-up
        const save_snapshot: boolean = formData.answer;
        this.isdeleting = true;
        this.iscreating = true;

        this.changeServiceIsDeleting(service, true);
        //send event for the actual state of services
        this.observableService.emitServicesChangedFromServicespage(this.services);
        this.downService(service.service_id, save_snapshot, formData.comments).subscribe((data)=>{
            this.replaceObjects(data)
            if(!(this.checkAreCreating())){
              this.checkAllStarted();
            };
            //send event for the actual state of services
            this.observableService.emitServicesChangedFromServicespage(this.services);
            this.isdeleting = false;
            this.iscreating = false;
        }
        ,error=>{
          this.getServices().subscribe((response) => {
            this.filterFrontal(response);
            this.iscreating = false;
            this.isdeleting = false;
            //send event for the actual state of services
            this.observableService.emitServicesChangedFromServicespage(this.services);
            this.errorhandler.handleError(error)
          })
        }
        );
      }
    })
}



  /**
   * a function that makes a request for getting a service's snapshots (the main service we want to launch)
   * @returns an observable
   */
  getSnapshots(service: any){
    const snapshots = this.serviceService.getSnapshots(this.organization_id, service.service_id);
    return snapshots;
  }



  /**
 * a function that makes a request for starting a service with it needed services
 * @returns an observable of type Object
 */
  startService(service_id, chosenSnapshot ){
    let serviceUpDto = new serviceUpDTO();
    //push the main service to start
    serviceUpDto.services.push({
      service_id: service_id,
      snapshot_id: chosenSnapshot,
    });

    const data = this.serviceService.StartService(this.organization_id, serviceUpDto);
    return data;
  }

  downService(service_id, save_snapshot: boolean, comments: any){
    const serviceDownDto = new serviceDownDTO();
      serviceDownDto.services.push(
        { service_id : service_id,
          save_snapshot: save_snapshot,
          comment: comments[service_id]
        }
      );
    const data = this.serviceService.StopService(this.organization_id, serviceDownDto);
    return data;
  }

  async appendSnapshotsToServices(services: any) {
    this.downServices = [];
    const snapshotPromises = services.map(service =>
      this.serviceService.getSnapshots(this.organization_id, service.service_id).toPromise()
    );
    try {
      const responses = await Promise.all(snapshotPromises);
      responses.forEach((response, index) => {
        const snapshots = response;
        this.downServices.push({...services[index], snapshots});
      });
    } catch (error) {
      console.error('Error fetching snapshots:', error);
      this.errorhandler.handleError(error);
    }
    return this.downServices;
  }

  /**
   * change the services is_creating property
   * @param service
   * @param is_running
   */
  changeServiceAreCreating(neededservices: any, is_creating: boolean){
    for(let neededService of neededservices){
      //update services array to show that the concerned services are creating
      this.services = this.services.map((element) =>{
        if(element.service_id === neededService.service_id){
          return {...element, is_creating};
        }
        return element;
      })
    }
  }

  /**
   * change the service is_creating property
   * @param service
   * @param is_running
   */
   changeServiceIsDeleting(service: any, is_deleting: boolean){
    this.services = this.services.map((element) =>{
      if(element.service_id === service.service_id){
        // element.is_deleting = true;
        return {...element, is_deleting};
      }
      return element;
    })
  }

  /* #################
      Tags Management
     #################
  */

  /**
   * get tags from database
   * @returns an observale of tags objects
   */
  getTags(){
    return this.tagService.getTags(this.organization_id).subscribe(response =>{
      this.tags = response;
    });
  }

    /* #################
      Modes Management
     #################
  */
 getModes(){
  this.modeService.getModes().subscribe((response) =>{
    this.modes = response;
  })
 }


//-------------------------------
// -------HISTORY PART-----------
//-------------------------------

openHistoryPopUp(){
  this.dialogService.open(LogsModalComponent, {
    context: {
      logs: this.logs,
    },
  });
}

/**
 * fetching services logs
 */
getServicesLogs(){
  this.serviceService.getServicesLogs(this.organization_id).subscribe((response) => {
    this.logs = response;
  })
}

/**
 * a function that sends is_creating property to childs
 */
sendAreCreatingEvent(){
  this.services = this.services.map((service) =>{
    return {...service, is_creating : true};
  })
}

/**
 * a function that sends is_creating property to childs
 */
sendAreDeletingEvent(){
  // send is_deleting input to childs
  this.services = this.services.map((service) =>{
    if(service.status){
      return {...service, is_deleting : true};
    }
    else {
      return {...service};
    } return {...service};
    });
}
}
