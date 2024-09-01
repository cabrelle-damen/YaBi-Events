import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeycloakUserService } from './keycloak-user.service';
import { MockEventService } from './mock-event.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private userService: KeycloakUserService,
    private eventService: MockEventService
  ) {}

  getDashboardStats(): Observable<any> {
    return forkJoin({
        users: this.userService.getUsers(),
        events: this.eventService.getEvents()
    }).pipe(
        map(data => {
            const totalUsers = data.users.length;
            // Utilisez `username` ou combinez firstName et lastName
            const userNames = data.users.map(user => user.firstName + ' ' + user.lastName);
            
            const totalEvents = data.events.length;
            const events = data.events.map(event => ({
                photo: event.photo,
                title: event.title,
                date: event.date,
                participants: event.participants
            }));

            console.log('User Names:', userNames); // Debug les noms des utilisateurs
            console.log('Events:', events); // Debug les événements

            return {
                totalUsers,
                userNames, 
                totalEvents,
                totalParticipants: data.events.reduce((acc, event) => acc + event.participants, 0),
                events 
            };
        })
    );
}
  
  

  getExpenses(): Observable<any[]> {
    // Remplacez par un vrai appel à votre service de dépenses
    return of([
      { id: 1, description: 'Expense 1', amount: 100 },
      { id: 2, description: 'Expense 2', amount: 200 }
    ]);
  }

  // Ajoutez la méthode deleteExpense
  deleteExpense(expenseId: number): Observable<any> {
    // Remplacez par un vrai appel à votre service de dépenses
    return of({ success: true });
  }
  
}
