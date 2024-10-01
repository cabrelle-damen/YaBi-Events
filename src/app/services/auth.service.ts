// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private token: string = ''; ;

//   constructor(private http: HttpClient) {}

//   login(username: string, password: string): Observable<any> {
//     const params = new URLSearchParams();
//     params.append('grant_type', 'password');
//     params.append('client_id', '<YOUR_CLIENT_ID>');
//     params.append('username', username);
//     params.append('password', password);

//     return this.http.post<any>('http://localhost:8080/auth/realms/DAMEN/protocol/openid-connect/token', params.toString(), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
//   }

//   setToken(token: string): void {
//     this.token = token;
//   }

//   getToken(): string {
//     return this.token;
//   }
// }