import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  /** an input for the modal content cause we have to use cases ('Démarrer'/'Arreter') */
  @Input() content: string;

  /**an input for validate button content ('Démarrer'/Arrêter')*/
  @Input() Action: string;

  @Input() headerIcon: string;
  public constructor(protected ref: NbDialogRef<ConfirmModalComponent>){}

  ngOnInit(): void {
  }
  
  cancel() {
    this.ref.close();
  }


  submit() {
    this.ref.close(true);
  }

}
