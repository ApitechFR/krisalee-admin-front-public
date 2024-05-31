import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbInputModule } from '@nebular/theme';
import { UpdateCommentComponent } from './update-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateCommentComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateCommentModule { }
