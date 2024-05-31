import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  @Input() versions: any;
  @Output() addVersion = new EventEmitter();
  @Output() deleteVersion = new EventEmitter();
  @Output() affectOrganization = new EventEmitter();
  @Output() unassignOrganization = new EventEmitter();

  expanded: boolean;

  ngOnInit(){
  }

  
  toggle(){
    this.expanded = !this.expanded;
  }

}
