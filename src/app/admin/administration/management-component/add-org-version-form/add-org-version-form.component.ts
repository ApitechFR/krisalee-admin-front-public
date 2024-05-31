import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-org-version-form',
  templateUrl: './add-org-version-form.component.html',
  styleUrls: ['./add-org-version-form.component.scss']
})
export class AddOrgVersionFormComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() organizations: any;
  @Input() services: any;

  form = new FormGroup({
    organization_id: new FormControl('',),
    depends_on: new FormControl([]),
  });

  public constructor(protected ref: NbDialogRef<AddOrgVersionFormComponent>){}

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
