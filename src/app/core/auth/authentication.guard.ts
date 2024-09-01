import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const loginData = localStorage.getItem('LoginData');
  
    console.log('LoginData:', loginData); // Ajouter un log ici
  
    if (!loginData) {
      console.log('Redirection vers la page de connexion');
      this.router.navigate(['/login']);
      return false;
    }
  
    console.log('Accès autorisé');
    return true;
  }
  
}
