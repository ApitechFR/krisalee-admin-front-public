import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  
  @Input() services: any;
  @Input() organizations: any;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

    service_id: new FormControl('',Validators.required),
    organizations: new FormArray([]),
    depends_on: new FormArray([]),
  });

  public constructor(protected ref: NbDialogRef<ProductFormComponent>){}

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
