import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  private users = this.generateUsers(10); // Génère 10 utilisateurs factices

  private generateUsers(count: number): any[] {
    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        phone: `123-456-78${i.toString().padStart(2, '0')}`,
        amount_due: Math.floor(Math.random() * 500),
        registered_on: new Date(),
        status: i % 2 === 0 ? 'Active' : 'Inactive'
      });
    }
    return users;
  }

  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  updateUser(id: number, updatedData: any): Observable<void> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updatedData);
    }
    return of();
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    return of();
  }
}
