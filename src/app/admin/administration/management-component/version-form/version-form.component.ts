import { Component, OnInit } from '@angular/core';
import {  NbDialogRef } from '@nebular/theme';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-version-form',
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.scss']
})
export class VersionFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    node_pool: new FormControl('', Validators.required)
  });

  public constructor(protected ref: NbDialogRef<VersionFormComponent>){}

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
