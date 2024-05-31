import { Component,OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.scss']
})
export class AddTagDialogComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    system: new FormControl(false),
    unique: new FormControl(false),
  });

  public constructor(protected ref: NbDialogRef<AddTagDialogComponent>){}

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
