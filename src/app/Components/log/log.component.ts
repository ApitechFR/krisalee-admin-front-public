import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit{
  @Input() logs: any;
  expanded: boolean;


  constructor(){}

  
  ngOnInit(): void {
  }

  open(){
    this.expanded = !this.expanded;
  }

}
