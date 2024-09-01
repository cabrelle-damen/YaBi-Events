import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { AllModulesService } from './services/all-modules.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'DAMEN',
        clientId: 'YaBi'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
    });
}

@NgModule({
  declarations: [
    AppComponent, 
    AcceuilComponent, 
    AuthentificationComponent, LogoutButtonComponent, NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
    GoogleMapsModule,
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
   
    
    KeycloakAngularModule,
    RouterModule ,
    CommonModule    
  ],
  providers: [
    AllModulesService,
    AuthenticationGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
