import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-executing-request',
  templateUrl: './executing-request.component.html',
  styleUrls: ['./executing-request.component.scss']
})
export class ExecutingRequestComponent implements OnInit {

  @Input() message: string;
  @Input() users: any;
  @Input() connector: any;
  
  /** a variable for alerted users */
  alerted : any;

  alertUserId : string = environment.alertUserId;
  public constructor(protected ref: NbDialogRef<ExecutingRequestComponent>){} 


  ngOnInit(){
  }
}
