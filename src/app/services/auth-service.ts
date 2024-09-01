import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = `${environment.keycloakBaseUrl}/admin/realms/${environment.realm}/users`;

  // constructor(private http: HttpClient) {}

  // // Method to get users from Keycloak
  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // // Other methods
  // updateCertificationStatus(userId: string, isCertified: boolean): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${userId}`, { attributes: { certified: [isCertified.toString()] } });
  // }

  // getCertificationStatus(userId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${userId}`);
  // }

  constructor(private keycloakService: KeycloakService) {}

  getUserProfile() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    const tokenParsed = keycloakInstance.tokenParsed;

    if (tokenParsed) {
      return {
        firstName: tokenParsed['given_name'],  // Access with bracket notation
        lastName: tokenParsed['family_name'],  // Access with bracket notation
        email: tokenParsed['email'],           // Access with bracket notation
      };
    }
    return null;
  }
}
