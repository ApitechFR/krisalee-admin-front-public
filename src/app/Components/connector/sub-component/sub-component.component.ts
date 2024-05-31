import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ConnectorService } from '../../../Services/Connector/connector.service';
import { NbDialogService } from '@nebular/theme';
import { PlanificationDialogComponent } from '../planification-dialog/planification-dialog.component';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.scss']
})
export class SubComponentComponent implements OnInit {
    @Output() launch = new EventEmitter();
    @Output() stop = new EventEmitter();
    /** an input for the current service */
    @Input() connector: any;

    /** connector logs */
    logs: any

    /** Alert users connector id */
    alertUserId : string = environment.alertUserId;


    organization_id= environment.ORGANIZATION_ID;

    /** a variable to check if a connector is running or not */
    // is_running: boolean;

    /** a variable for storing the connector's status */
    // status: boolean;

  constructor(private connectorService: ConnectorService, private dialogService: NbDialogService, private router: Router){
  }

  ngOnInit(): void {
    this.connectorService.getLogs(this.organization_id, this.connector.connector_id).subscribe((response) => {
      this.logs = response;
    })
  }

  getConnector(){
    const data = this.connectorService.getConnector(this.organization_id, this.connector.connector_id);
  }

  getstatusString(status: number){
    switch (status){
      case 0:
        return 'erreur'
      case 1:
        return 'OK';

    }
  }

  planify(){
    this.dialogService.open(PlanificationDialogComponent,
      {
        context: {
          connector: this.connector,
        },
      }
    ).onClose.subscribe((formData) => {
      console.log(formData)
    })
  }

  getConnectorLogs(){
    this.connectorService.getLogs(this.organization_id, this.connector.connector_id).subscribe((response) => {
      this.logs = response;
    })

  }

  navigateToUserRoute(){
    this.router.navigate(['/', 'admin','config','admin-users']);
  }

}
