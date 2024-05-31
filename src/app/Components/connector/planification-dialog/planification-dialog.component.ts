import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-planification-dialog',
  templateUrl: './planification-dialog.component.html',
  styleUrls: ['./planification-dialog.component.scss']
})
export class PlanificationDialogComponent implements OnInit {

  @Input() connector: any;
  options: string[] = ['Toutes les semaines','Tous les jours']

  form = new FormGroup({
    planification: new FormControl(this.options[0], Validators.required),
  });

  public constructor(protected ref: NbDialogRef<PlanificationDialogComponent>){

  }

  ngOnInit(): void {

  }

  submit(){

  }



}
