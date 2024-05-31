import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-not-implemented',
  styleUrls: ['./not-implemented.component.scss'],
  templateUrl: './not-implemented.component.html',
})
export class NotImplementedComponent {

  constructor(private menuService: NbMenuService) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
