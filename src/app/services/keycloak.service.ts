import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService, private router: Router) { }

  init() {
    return this.keycloakService.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'DAMEN',
        clientId: 'YaBi'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    }).then(authenticated => {
      if (authenticated) {
        this.router.navigate(['/index']);
      }
    }).catch(error => {
      console.error('Keycloak initialization failed', error);
    });
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
