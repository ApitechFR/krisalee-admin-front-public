import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';


import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { KeycloakSecurityService } from '../../../Keycloak-config/keycloak-security.service';
import { OrganizationsService } from '../../../Services/organizations/organizations.service';
import { environment } from '../../../../environments/environment';
import { Organization } from '../../../Models/organization/entities/organization.entity';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy
{
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  nbmenuService= new NbMenuService();

  organization: Organization;
  private organization_id: string = environment.ORGANIZATION_ID;

  emergencyStatusCard: CardSettings =
  {
    title: 'SI de Secours',
    iconClass: 'nb-danger',
    type: 'danger',
  };
  emergencyModeDetails =
  {
    type: 'danger',
    content: "L'activation du SI de Secours permet de <strong>démarrer tous les services et d'alerter tous les utilisateurs.</strong> \
    Les utilisateurs seront alors dirigés sur le site web de communication d'urgence, et pourront configurer leur nouveau mot de passe pour accéder aux services."
  }

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];


  currentTheme = 'default';


  // userMenu = [ { title: 'Profile' }, { title: 'Log out'} ];
  userMenu = [ { title: 'Déconnexion'} ];
  tag = 'my-context-menu';



  fullName: string;
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private securityService: KeycloakSecurityService,
              private organziationService: OrganizationsService,
              ) {
                this.securityService.kc.loadUserProfile().then(data => {
                  this.fullName = data.firstName + " " + data.lastName;
                })
                menuService.onItemClick().pipe(filter(({ tag }) => {
                  return tag === this.tag
                }))
                .subscribe(bag => {
                  if(bag.item.title==='Déconnexion'){
                    this.securityService.kc.logout();
                }});
  }


  ngOnInit() {
    // initialize organization only if not admin
    if(!(this.securityService.kc.tokenParsed.realm_access.roles.includes('admin'))){
      this.organization = new Organization(this.organization_id.toUpperCase(), null, null);
    }

    this.currentTheme = this.themeService.currentTheme;
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.default);


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);


    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();


    return false;
  }


  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  logout(): void{
    this.securityService.kc.logout();
  }
  onMenuItemClick(){
    this.securityService.kc.logout();
  }
}
