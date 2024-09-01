import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {

  constructor(private keycloakService: KeycloakService) { }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}