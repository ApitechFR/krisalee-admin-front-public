import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-unassign-org-version-form',
  templateUrl: './unassign-org-version-form.component.html',
  styleUrls: ['./unassign-org-version-form.component.scss']
})
export class UnassignOrgVersionFormComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() organizations: any;

  form = new FormGroup({
    organization_id: new FormControl('', Validators.required),
  });

  public constructor(protected ref: NbDialogRef<UnassignOrgVersionFormComponent>){}

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
