import { Injectable } from '@angular/core';
import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlerService {

  constructor( private dialogService: NbDialogService, private router: Router) { }

  handleSuccess(message: any){
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Success',
                message: message,
                color: '#28a745'
                // message : this.message,
              },
            });
  }
}
