import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../Services/users/users.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { SaveSnapshotModalComponent } from '../service/save-snapshot-modal/save-snapshot-modal.component';
import { ExecutingRequestComponent } from '../executing-request/executing-request.component';
import { SuccessHandlerService } from '../../Services/successHandler/success-handler.service';
import { ErrorHandlerService } from '../../Services/errorHandler/error-handler.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  source: LocalDataSource = new LocalDataSource();

  /** a variable for users data */
  users: any;

  /** filtered users based on entry in search input */
  filteredUsers: any;
  /**text to type for ngModel */
  searchText: string = '';
  /**array of search columns */
  searchColumns: string[] = environment.SEARCH_COLUMNS;

  organization_id: string = environment.ORGANIZATION_ID;

  constructor(private usersService: UsersService, private dialogService: NbDialogService, 
    private successHandler: SuccessHandlerService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.usersService.getUsers(this.organization_id).subscribe(response =>{
      this.filteredUsers = this.users = response;
    })
  }

  alert(user: any){
    this.dialogService.open(SaveSnapshotModalComponent,
      {
        context:
          {
            content: `Voulez-vous alerter par SMS l\'utilisateur ${user.firstName} ${user.lastName} ?`,
            headerIcon: 'fas fa-bell',
            confirmButtonContent: '',
            DenyButtonContent: '',
            validateButtonContent: 'Envoyer alerte'
          }
      }
    ).onClose.subscribe((formData) => {
      if(formData && formData.answer){ 
        let dialogRef = this.showAlertingUserModal();

        this.usersService.alertUser(this.organization_id, user.id).subscribe(response =>{
          this.replaceObjects(response);
          dialogRef.close();
          this.successHandler.handleSuccess('Opération terminée avec succès.')
        }, error =>{
          dialogRef.close();
          this.errorHandler.handleError('Opération échouée.')
        }
        )
      }
    })
  }


  /** Method implementation to filter users based on search criteria */ 
  applyFilter() {
    if (!this.searchText) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user => {
      // Use the search columns array dynamically
      return this.searchColumns.some(column =>
        user[column].toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }


  /**
   *   a function that opens a pop-up if one user or more are alerting

   */
  showAlertingUserModal(){
    return this.dialogService.open(ExecutingRequestComponent, {
      context: {
        message: `Envoie du sms d\'alerte à l\'utilisateur ...`
      },
      closeOnBackdropClick: false,  // Désactive la possibilité de fermer en cliquant en dehors du dialogue
    });
  }


  replaceObjects(data: any){
    this.users = this.users.map(user => data.find(o => o.user_id === user.user_id) || user);
  }
}
