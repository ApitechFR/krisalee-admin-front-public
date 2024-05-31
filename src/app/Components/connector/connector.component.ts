import { Component } from '@angular/core';
import { ConnectorService } from '../../Services/Connector/connector.service';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { interval } from 'rxjs';
import { switchMap, takeWhile, timeout } from 'rxjs/operators';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { LaunchDialogComponent } from './launch-dialog/launch-dialog.component';
import { AlertLevelEnum } from '../../Models/enums/alertUsers.enum';
import { ErrorHandlerService } from '../../Services/errorHandler/error-handler.service';
import { environment } from '../../../environments/environment';
import { ServicesService } from '../../Services/services/services.service';
import { RunConnectorDto } from '../../Models/connector/startConnector-dto';
import { map } from 'rxjs/operators';
import { ExecutingRequestComponent } from '../executing-request/executing-request.component';
import { SuccessHandlerService } from '../../Services/successHandler/success-handler.service';
import { alertUsersConnectorResponse } from '../../Models/connector/connector.response';

@Component({
  selector: 'ngx-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent {

   /** a variable storing the Client identifier */
   organization_id: string = environment.ORGANIZATION_ID;

   /** a variable storing the services */
   connectors: any;
 
   /** a variable set to true while creating/launching a service */
   iscreating: boolean;
 
     /** a variable set to true while deleting/stoping a service */
   isdeleting: boolean;
 
   /** a variable to check whether all service started or not */
   allStarted: boolean ;
 
   /** a variable storing the list of down services */
   downServices: any;

   /** list of users to alert */
   users: any[] = [];



   constructor(private connectorService: ConnectorService, 
                private dialogService: NbDialogService, 
                private errorhandler: ErrorHandlerService,
                private serviceService: ServicesService,
                private successHandler: SuccessHandlerService) { }

  ngOnInit(): void {
    const eventSource = new EventSource('/events');
    eventSource.addEventListener('message', (event) => {
      this.connectors = event.data
    });
    this.getConnectors().subscribe((response) => {
      this.connectors = response;

      interval(10*1000)
      .pipe(
        takeWhile(() => this.checkStoppedCreating()), // continue while condition is true
        switchMap(() => this.getConnectors()),
      )
      .subscribe(response => {
        this.connectors = response;
      });
      })

  }

  /**
   * 
   * @returns observable of sorted connectors
   */
  getConnectors(){
    const connectors = this.connectorService.GetConnectors(this.organization_id).pipe(
      map((data: any[]) => {
        // Triez les services par ordre alphabétique en utilisant la fonction sort()
        return data.sort((connectorA, connectorB) => connectorA.name.localeCompare(connectorB.name));
      })
    );
    return connectors;
  }

  /** launch a connector */
  async launch(connector: any){
    let alertLevel = false;
    let confirmButtonContent : string;
    if(connector.connector_id == environment.alertUserId){
      alertLevel = true;
      confirmButtonContent = 'Envoyer l\'alerte';
    }
    await this.appendSnapshotsToServices(connector.depends_on);

    const formData = await this.openDialogComponent(connector, alertLevel, confirmButtonContent);
    if (formData) { 
      //send is_creating state to childs
      this.connectors = this.connectors.map((element) =>{
        if(element.connector_id === connector.connector_id){
          // element.is_deleting = true;
          return {...element, is_running : true};
        }
        return element;
      })

      //prepare the dto
      let runConnectorDto = new RunConnectorDto();
      runConnectorDto.services = [];
      if(alertLevel){
        runConnectorDto.alert_level = this.stringToAlertLevelEnum(formData.alertLevel);
        runConnectorDto.sms_header = formData.sms_header;
      }
      else if(!alertLevel){
        for(let serviceWithSnapshot of formData.depends_on){
          runConnectorDto.services.push({
            service_id : serviceWithSnapshot.service,
            snapshot_id : serviceWithSnapshot.snapshot
          });
        }
      }

      // choose which messages to show during and after a connector's running process
      let executionMessage : string = `${connector.name} en cours...`;
      let executionResult : string = `Opération terminée avec succès`;
      let dialog = this.showAlertingUserModal(executionMessage, connector);
      //run the connector
      this.connectorService.StartConnector(this.organization_id, connector.connector_id, runConnectorDto)
        .subscribe((response : alertUsersConnectorResponse) =>{
          this.replaceObjects(response);
          dialog.close();
          let showNavigateToUserspageButton: boolean = false;
          if(connector.connector_id == environment.alertUserId){
            executionResult = `
                Utilisateurs notifiés : ${response.alertedUsers},
                Utilisateurs déjà notifiés : ${response.alreadyEnabledUsers},
                Utilisateurs en échec : ${response.failedUsers}
              `;
              showNavigateToUserspageButton = true;
          }
          this.handleSuccess(executionResult, showNavigateToUserspageButton);
        }, 
        error =>{
          this.getConnectors().subscribe((response) =>{
            this.connectors = response;
            dialog.close();
            this.errorhandler.handleError(error);
          }, error =>{
            this.changeConnectorstate(connector, false);
            dialog.close();
            this.errorhandler.handleError(error);
          })
        }
      )
    }
  }

  /**
   * display a pop-up on success operations
   * @param message message to show
   * @param showNavigateToUserspage useful when we want to show 'go to users page button' after alert users connector is done
   */
  handleSuccess(message: any, showNavigateToUserspageButton: boolean){
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: `Opération terminée avec succès`,
        message: message,
        color: '#28a745',
        navigateToUsersButton: showNavigateToUserspageButton,
        // message : this.message,
      },
    });
}

  /**
   * a function that opens a pop up for configuring the connector to launch
   * @param connector 
   * @param alertLevel 
   * @param confirmButtonContent 
   */
  async openDialogComponent(connector: any, alertLevel: boolean, confirmButtonContent) : Promise<any>{
   return new Promise<any>((resolve) => {
      this.dialogService
        .open(LaunchDialogComponent, {
          context: {
            alertLevel: alertLevel,
            connector: connector,
            depends_on: this.downServices,
            confirmButtonContent: confirmButtonContent ? confirmButtonContent : 'Valider',
          },
        })
        .onClose.subscribe((data) => {
          resolve(data);
        });
    });
  }

  /**
   *   a function that opens a pop-up while alert users connector is running
   */
  showAlertingUserModal(message: string, connector: any){
    return this.dialogService.open(ExecutingRequestComponent, {
      context: {
        message,
        users: this.users,
        connector: connector,
      },
      closeOnBackdropClick: false,  // Désactive la possibilité de fermer en cliquant en dehors du dialogue
    });
  }

  /**
   * append snapshot to service to send them to the pop
   * @param depends_on the list of services on which depends the connector 
   * @returns services to start for the connector
   */
  async appendSnapshotsToServices(depends_on: any) {
    this.downServices = [];
    const snapshotPromises = depends_on.map(service_id =>
      this.serviceService.getSnapshots(this.organization_id, service_id).toPromise()
    );
    try {
      const responses = await Promise.all(snapshotPromises);
      responses.forEach((response, index) => {
        const snapshots = response;
        const deps = {service_id: depends_on[index], snapshots: snapshots};
        this.downServices.push({...deps});
      });
    } catch (error) {
      console.error('Error fetching snapshots:', error);
      this.errorhandler.handleError(error);
    }
    return this.downServices;
  }

  stringToAlertLevelEnum(niveau: string){
    switch (niveau){
      case 'Niveau 0':
        return AlertLevelEnum.ALERT_LEVEL_0;
      case 'Niveau 1':
        return AlertLevelEnum.ALERT_LEVEL_1;
      case 'Niveau 2':
        return AlertLevelEnum.ALERT_LEVEL_2;
      case 'Niveau 3':
        return AlertLevelEnum.ALERT_LEVEL_3;
    }
  }

  /** launch connector*/
  // start(connector: any){
  //   this.connectors = this.connectors.map((element) =>{
  //     if(element.connector_id === connector.connector_id){
  //       // element.is_deleting = true;
  //       return {...element, is_running : true};
  //     }
  //     return element;
  //   })
  //   this.connectorService.StartConnector(this.organization_id, connector.connector_id).subscribe((response) =>{
  //     this.getConnectors().subscribe((response) =>{
  //       this.connectors = response;
  //     }, error =>{
  //       this.changeConnectorstate(connector, false)
  //       this.errorhandler.handleError(error);
  //     })
  //   }, 
  //   error =>{
  //     this.getConnectors().subscribe((response) =>{
  //       this.connectors = response;
  //       this.errorhandler.handleError(error);
  //     }, error =>{
  //       this.changeConnectorstate(connector, false);
  //       this.errorhandler.handleError(error);
  //     })
  //   }
  //   )
  // }

  stop(connector: any){
    this.connectors = this.connectors.map((element) =>{
      if(element.connector_id === connector.connector_id){
        // element.is_deleting = true;
        return {...element, is_running : true};
      }
      return element;
    })

    // this.connectorService.StopConnector(this.organization_id, connector.connector_id).subscribe((response) =>{
    //   this.getConnectors().subscribe((response) =>{
    //     this.connectors = response;
    //   }, error =>{
    //     this.launchError(error.message);
    //   })
    // }, error =>{
    //   this.launchError(error.message);
    // })
  }

  launchError(message: string){
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Erreur',
        message : message,
      },
    });
  }
  
    /**
     * function that checks if services are stopped creating/deleting or not
     * @returns true if at least one service is creating/deleting, false otherwise
     */
    checkStoppedCreating(){
      for(let connector of this.connectors ){
        if(connector.is_running){
          return true;
        }
      }
      return false;
    }

/**
 * change the connector is_running property
 * @param connector 
 * @param is_running 
 */
    changeConnectorstate(connector: any, is_running: boolean){
      this.connectors = this.connectors.map((element) =>{
        if(element.connector_id === connector.connector_id){
          // element.is_deleting = true;
          return {...element, is_running : is_running};
        }
        return element;
      })
    }


  /**
   * update the list of connectors after http responses
   * @param objects 
   */
  replaceObjects(object: any){
    this.connectors = this.connectors.map(connector => object.connector_id === connector.connector_id ? object : connector);
  }
}
