import { Injectable, ErrorHandler } from '@angular/core';
import { NbDialogService } from "@nebular/theme";
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor( private dialogService: NbDialogService, private router: Router) { }

  handleError(Error: any){
      if(Error.name == 'TimeoutError' || Error.status == 504){
          location.reload();
      }
      else if(Error.error){

        if(Error.error.message){
            this.dialogService.open(ShowcaseDialogComponent, {
              context: {
                title: 'Erreur',
                message: Error.error.message,
                color: 'rgb(240, 13, 13)'
                // message : this.message,
              },
            });
        }

        else{
          this.dialogService.open(ShowcaseDialogComponent, {
             context: {
               title: 'Erreur',
               message: Error.message,
               color: 'rgb(240, 13, 13)'
               // message : this.message,
             },
           });
        }
      }
      else{
        this.dialogService.open(ShowcaseDialogComponent, {
          context: {
            title: 'Erreur',
            message: Error,
            color: 'rgb(240, 13, 13)'
            // message : this.message,
          },
        });
      }
  }
}
