import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertLevelEnum } from '../../../Models/enums/alertUsers.enum';
import { SnapshotStatus } from '../../../Models/enums/snapshotStatus';
import { SmsHeaderEnum } from '../../../Models/enums/smsHeader';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'ngx-launch-dialog',
  templateUrl: './launch-dialog.component.html',
  styleUrls: ['./launch-dialog.component.scss']
})
export class LaunchDialogComponent {
  
  status = 'primary';

  alertUserId : string = environment.alertUserId;

  @Input() connector: any;
  @Input() depends_on: any;
  @Input() confirmButtonContent: string;
  /** variable set to true when the connector to run is 'alert users' */
  @Input() alertLevel: boolean;
  options: string[] = ['Niveau 0','Niveau 1','Niveau 2','Niveau 3'];
  smsHeaderOptions = Object.values(SmsHeaderEnum);

  form = new FormGroup({
    alertLevel: new FormControl('',),
    depends_on: new FormArray([]),
    sms_header: new FormControl('',),
  });

  public constructor(protected ref: NbDialogRef<LaunchDialogComponent>){

  }

  ngOnInit(): void {
    const formArray = this.form.get('depends_on') as FormArray;
    for(let serviceWithSnaphsots of this.depends_on){
      formArray.push(new FormGroup({
        service: new FormControl(serviceWithSnaphsots.service_id),
        // checked: new FormControl(true),
        snapshot: new FormControl(''),
      }));
    }
  }

  submit(){
      if(this.form.valid){
        this.ref.close(this.form.value);
      }
      else {
        this.status = 'danger'
        console.log('form is not valid');
        // this.ref.close()
      }

  }

  cancel(){
    this.ref.close();
  }

  onChange(event: any){
    if(this.form.get('alertLevel').valid){
      this.status = 'success';
    }
    else{
      this.status = 'danger';
    }
  }
}
