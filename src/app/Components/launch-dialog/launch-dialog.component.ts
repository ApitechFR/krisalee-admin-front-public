import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { SnapshotStatus } from '../../Models/enums/snapshotStatus';
import { ProductService } from '../../Services/product/product.service';

@Component({
  selector: 'ngx-launch-dialog',
  templateUrl: './launch-dialog.component.html',
  styleUrls: ['./launch-dialog.component.scss']
})
export class LaunchDialogComponent implements OnInit {
  @Input() snapshots: any;
  @Input() service: any;

  startServiceForm = new FormGroup({
    // product: new FormControl('', Validators.required),
    snapshot: new FormControl('', Validators.required),
  });

  constructor(protected ref: NbDialogRef<LaunchDialogComponent>) { }

  ngOnInit(): void {
    if(!this.snapshots.length){
      this.snapshots = undefined
    }

  }

  submit() {
    this.ref.close(this.startServiceForm.value);
  }

  cancel() {
    this.ref.close();
  }

}
