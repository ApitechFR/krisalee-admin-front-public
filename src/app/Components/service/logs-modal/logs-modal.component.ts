import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-logs-modal',
  templateUrl: './logs-modal.component.html',
  styleUrls: ['./logs-modal.component.scss']
})
export class LogsModalComponent implements OnInit {
  @Input() logs: any;

  isPopupOpen: boolean;

  constructor(protected ref: NbDialogRef<LogsModalComponent>) { }

  ngOnInit(): void {
    this.isPopupOpen = true;
  }

  dismiss() {
    this.ref.close();
  }

}
