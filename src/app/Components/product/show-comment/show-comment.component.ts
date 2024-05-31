import { Component, OnInit, Input } from '@angular/core';
import {  NbDialogRef } from '@nebular/theme';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.scss']
})
export class ShowCommentComponent implements OnInit{

  @Input() snapshot: any;

  public constructor(protected ref: NbDialogRef<ShowCommentComponent>){

  }

  ngOnInit(){
  }

  onModifyClick() {
    this.ref.close({ action: 'modifier'});
  }

  close() {
    this.ref.close();
  }

}
