import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KeycloakSecurityService} from '../../../../Keycloak-config/keycloak-security.service';
import {TagType} from '../../../../Models/enums/tagType';

@Component({
  selector: 'ngx-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.scss']
})
export class SubComponentComponent {

  @Input() snapshot: any;
  @Input() is_deleting : boolean;
  @Output() delete = new EventEmitter();
  @Output() assignTag = new EventEmitter();
  @Output() unassignTag = new EventEmitter();
  @Output() showComment = new EventEmitter();

  public constructor(private securityService: KeycloakSecurityService){

  }

  ngOnInit(): void {
  }

  /**
   * a function that returns false only if the tag is source and the user is not admin, true otherwise (because only admin users can manage source tag)
   * @param tage_type
   * @returns
   */
  checkCanManageSourceTag(tage_type: TagType){
    if((tage_type === TagType.SOURCE) && !(this.checkIsUserAdmin()))
      return false;
    return true;
  }

  /**
 * a function that checks if the connected user is admin
 * @returns true if he is, false otherwise
 */
   checkIsUserAdmin(){
    if(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin')){
      return true;
    }
    return false;
  }

}
