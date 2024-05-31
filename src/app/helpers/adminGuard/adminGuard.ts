import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: KeycloakSecurityService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.kc.tokenParsed.realm_access.roles.includes('admin')) {
      return true;
    } else {
      this.router.navigate(['/admin/home']);
      return false;
    }
  }
}
