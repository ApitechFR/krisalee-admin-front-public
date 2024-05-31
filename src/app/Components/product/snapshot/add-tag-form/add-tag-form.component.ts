import { Component, OnInit, Input } from '@angular/core';
import {  NbDialogRef } from '@nebular/theme';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.scss']
})
export class AddTAgFormComponent implements OnInit{

  @Input() tags: any;

  form = new FormGroup({
    tag_id: new FormControl('', Validators.required),
  });
  public constructor(protected ref: NbDialogRef<AddTAgFormComponent>){}

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
