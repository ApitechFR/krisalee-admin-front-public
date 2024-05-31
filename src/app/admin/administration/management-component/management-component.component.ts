import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.scss']
})
export class ManagementComponentComponent implements OnInit {

  @Input() itemName: string;
  @Input() items: any;

  @Output() delete =  new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() addVersion = new EventEmitter();
  @Output() deleteVersion = new EventEmitter();
  @Output() affectOrganization = new EventEmitter();
  @Output() unassignOrganization = new EventEmitter();
  @Output() update = new EventEmitter();


  public constructor(){

  }

  /**
   * a function that gathers the product and its version in on object and then it send them to the parent component
   * @param product 
   * @param version 
   */
  sendEventToParent(product: any, version: any){
    this.deleteVersion.emit({product, version});
  }

  sendAffectOrganizationEvent(product: any, version: any){
    this.affectOrganization.emit({product, version});
  }

  sendUnassignOrganizationEvent(product: any, version: any){
    this.unassignOrganization.emit({product, version})
  }

  ngOnInit(){
  }

}
