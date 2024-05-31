import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCommentComponent } from './show-comment.component';
import { NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [ShowCommentComponent],
  imports: [
    CommonModule,
    NbCardModule,
  ]
})
export class ShowCommentModule { }
