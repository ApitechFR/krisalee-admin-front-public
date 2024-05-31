import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {NbIconModule, NbProgressBarModule} from '@nebular/theme';
import { SnapshotModule } from './snapshot/snapshot.module';
import { LogModule } from '../log/log.module';
import { ShowCommentModule } from './show-comment/show-comment.module';
import { UpdateCommentModule } from './update-comment/update-comment.module';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    SnapshotModule,
    LogModule,
    ShowCommentModule,
    UpdateCommentModule,
    NbProgressBarModule
  ],
  exports: [
    ProductComponent,
  ]
})
export class ProductModule { }
