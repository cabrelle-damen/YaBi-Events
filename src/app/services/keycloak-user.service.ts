import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakUserService {
  private baseUrl = 'http://localhost:8080/admin/realms/DAMEN'; 
  private clientId = ''; 
  private token = ''; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  getUsers(): Observable<any[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(
        data => console.log('Users fetched:', data),
        error => console.error('Error fetching users:', error)
      )
    );
  }

  updateUser(userId: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.put<any>(url, data, { headers: this.getAuthHeaders() });
  }
}
