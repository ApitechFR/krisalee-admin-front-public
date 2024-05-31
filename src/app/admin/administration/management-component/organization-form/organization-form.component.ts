import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent {

  servicesUrlsPlaceholder : string = 'Exemple: https://www.exemple.fr';


  form = new FormGroup({
    // organization_id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    is_root: new FormControl(false, Validators.required),
    auth: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    drive: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    chat: new FormControl('', Validators.required),
    NEXT_CLOUD_USERNAME: new FormControl('', Validators.required),
    NEXT_CLOUD_PASSWORD: new FormControl('', Validators.required),
    MAILSERVER_POSTMASTER_USERNAME: new FormControl('', Validators.required),
    MAILSERVER_POSTMASTER_PASSWORD: new FormControl('', Validators.required),
    KC_SERVICE_ADMIN_USERNAME: new FormControl('', Validators.required),
    KC_SERVICE_ADMIN_PASSWORD: new FormControl('', Validators.required),
    HOST_DATA_SSH_PORT: new FormControl('', Validators.required),
    SFTP_HOST: new FormControl('', Validators.required),
    SFTP_PORT: new FormControl('', Validators.required),
    SFTP_USERNAME: new FormControl('', Validators.required),
    SFTP_PASSWORD: new FormControl('', Validators.required),
    KC_SERVICE_ADMIN_CLIENT_ID: new FormControl('', Validators.required),
    KC_SERVICE_URL: new FormControl('', Validators.required),
    ORG_DOMAIN: new FormControl('', Validators.required),
  });

  public constructor(protected ref: NbDialogRef<OrganizationFormComponent>){}

  ngOnInit(){

  }

  submit(){
    if(this.form.valid){
      this.ref.close(this.form.value);
    }
    else {
      this.ref.close()
    }
  }

  cancel(){
    this.ref.close();
  }

}
