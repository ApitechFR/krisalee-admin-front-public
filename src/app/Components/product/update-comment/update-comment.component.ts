import { Component, OnInit, Input } from '@angular/core';
import {  NbDialogRef } from '@nebular/theme';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit{

  form = new FormGroup({
    comment: new FormControl('', Validators.required),
  });


  @Input() snapshot: any;

  public constructor(protected ref: NbDialogRef<UpdateCommentComponent>){

  }

  ngOnInit(){
    this.form.patchValue({
      comment: this.snapshot.comment,
    })
  }

  submit() {
    this.ref.close(this.form.value);
  }

  cancel() {
    this.ref.close();
  }


}
