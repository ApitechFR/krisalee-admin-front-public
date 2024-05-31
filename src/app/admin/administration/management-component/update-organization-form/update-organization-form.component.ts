import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';
import { Organization } from '../../../../Models/organization/entities/organization.entity';

@Component({
  selector: 'ngx-update-organization-form',
  templateUrl: './update-organization-form.component.html',
  styleUrls: ['./update-organization-form.component.scss']
})
export class UpdateOrganizationFormComponent implements OnInit {

  public constructor(protected ref: NbDialogRef<UpdateOrganizationFormComponent>){}

  @Input() organization : Organization;

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
    NEXT_CLOUD_USERNAME: new FormControl( '', Validators.required),
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

  ngOnInit(){
    //initialize form values 
    if(this.organization){
      this.form.patchValue({
        name: this.organization.name || '',
        is_root: this.organization.is_root || false,
        auth: this.organization.organization_env?.services_url?.auth || '',
        mail: this.organization.organization_env?.services_url?.mail || '',
        drive: this.organization.organization_env?.services_url?.drive || '',
        website: this.organization.organization_env?.services_url?.website || '',
        chat: this.organization.organization_env?.services_url?.chat || '',
        NEXT_CLOUD_USERNAME: this.organization.organization_env?.services_credentials?.NEXT_CLOUD_USERNAME || '',
        NEXT_CLOUD_PASSWORD: this.organization.organization_env?.services_credentials?.NEXT_CLOUD_PASSWORD || '',
        MAILSERVER_POSTMASTER_USERNAME: this.organization.organization_env?.services_credentials?.MAILSERVER_POSTMASTER_USERNAME || '',
        MAILSERVER_POSTMASTER_PASSWORD: this.organization.organization_env?.services_credentials?.MAILSERVER_POSTMASTER_PASSWORD || '',
        KC_SERVICE_ADMIN_USERNAME: this.organization.organization_env?.services_credentials?.KC_SERVICE_ADMIN_USERNAME || '',
        KC_SERVICE_ADMIN_PASSWORD: this.organization.organization_env?.services_credentials?.KC_SERVICE_ADMIN_PASSWORD || '',
        HOST_DATA_SSH_PORT: this.organization.organization_env?.HOST_DATA_SSH_PORT || '',
        SFTP_HOST: this.organization.organization_env?.SFTP_HOST || '',
        SFTP_PORT: this.organization.organization_env?.SFTP_PORT || '',
        SFTP_USERNAME: this.organization.organization_env?.SFTP_USERNAME || '',
        SFTP_PASSWORD: this.organization.organization_env?.SFTP_PASSWORD || '',
        KC_SERVICE_ADMIN_CLIENT_ID: this.organization.organization_env?.KC_SERVICE_ADMIN_CLIENT_ID || '',
        KC_SERVICE_URL: this.organization.organization_env?.KC_SERVICE_URL || '',
        ORG_DOMAIN: this.organization.organization_env?.ORG_DOMAIN || '',
      })
    }

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
