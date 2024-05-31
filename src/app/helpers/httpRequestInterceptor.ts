import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {KeycloakSecurityService} from '../Keycloak-config/keycloak-security.service';
import {environment} from '../../environments/environment';

@Injectable()
export class httpRequestInterceptor implements HttpInterceptor {

  constructor(private securityService: KeycloakSecurityService,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercept the request and add the authorization header if a token exists
    const token = this.securityService.kc.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Handle errors with the request
    return next.handle(request).pipe(
      catchError((error) => {
        // If the token has expired, redirect the user to the Keycloak login page
        if (error.status === 401) {
          console.log("token expired")
          this.securityService.kc.logout();
        }
        return throwError(error);
      })
    );
  }

}
