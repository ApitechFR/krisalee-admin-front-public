import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { SnapshotStatus } from '../../Models/enums/snapshotStatus';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-launch-all-dialog',
  templateUrl: './launch-all-dialog.component.html',
  styleUrls: ['./launch-all-dialog.component.scss']
})
export class LaunchAllDialogComponent implements OnInit {
  
  @Input() snapshots: any;
  @Input() services: any;
  @Input() tags: any;
  status = 'primary';
  /** a variable responsible for showing or hiding the form for Configuration Mode */
  isFormControlVisible: boolean = false;
  /** a varible holding the tag's description */
  tagDescription: string;
  /** a variable responsible for showing/hiding the alert level 0 suggestion */
  isAlertLevel0CheckboxVisible: boolean;
  // a variable holding an object of the custom tag
  CustomTag = {
                tag_id: 'personnalisé_1698230866208', 
                name: 'Personnalisé',
                description: 'Démarrer les services sélectionnés en utilisant la sauvegarde le plus récent ou choisi'
              };

  form = new FormGroup({
    mode_lancement: new FormControl('', Validators.required),
    forcePasswordModification: new FormControl(true,),
    notifyUsers: new FormControl(true,),
    services_to_launch: new FormArray([]),
    alert_level_0: new FormControl(true),
  });

  constructor(protected ref: NbDialogRef<LaunchAllDialogComponent>) { }

  ngOnInit(): void {    
    const formArray = this.form.get('services_to_launch') as FormArray;
    for(let service of this.services){
      formArray.push(new FormGroup({
        service: new FormControl(service),
        checked: new FormControl(true),
        snapshot: new FormControl(undefined),
      }));
    }

    //here we make logic for showing the list of services to launch with their associated snapshots if mode is configuration
    this.form.get('mode_lancement').valueChanges.subscribe((tag) => {
      if(tag.tag_id == 'personnalisé_1698230866208'){
        this.isFormControlVisible = true;
      } else {
        this.isFormControlVisible = false;
      }

      if(tag.tag_id ===environment.PROD_TAG_ID){
        this.isAlertLevel0CheckboxVisible = true;
      } else {
        this.isAlertLevel0CheckboxVisible = false;
      }
      //here we just assign the modeDescription property the description of the active mode in dropdown
      if(tag.tag_id == 'personnalisé_1698230866208')
        this.tagDescription = tag.description
      else{
        this.tags.map(tg => {
          if(tag.tag_id === tg.tag_id){
            this.tagDescription = tg.description;
          }
        })
      }
    });
  }

  get services_to_launch(){
    return this.form.controls["services_to_launch"] as FormArray;
  }

  submit() {
    if(this.form.valid){
      this.ref.close(this.form.value);
    }
    else {
      this.status = 'danger'
      // this.ref.close()
    }
  }

  

  cancel() {
    this.ref.close();
  }

  onChange(event: any){
    if(this.form.get('mode_lancement').valid){
      this.status = 'success';
    }
    else{
      this.status = 'danger';
    }
  }
}
