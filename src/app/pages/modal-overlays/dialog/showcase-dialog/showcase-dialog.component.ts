import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit{

  @Input() title: string;
  @Input() message: string;
  @Input() color: string;
  /**
   * a variable that shows (go to users page button) when needed
   */
  @Input() navigateToUsersButton : boolean;

  isPopupOpen: boolean;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private router: Router) {}

  ngOnInit(){
    this.isPopupOpen = true;
  }

  dismiss() {
    this.ref.close();
  }

  navigateToUsersPage(){
    this.router.navigate(['/', 'admin','config','admin-users']);

  }
}
