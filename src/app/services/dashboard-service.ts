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

  getDashboardStats(): Observable<{
    totalUsers: number,
    userNames: string[],
    totalEvents: number,
    totalParticipants: number,
    events: { photo: string | undefined, title: string, date: Date, participants: number }[]
  }> {
    return forkJoin({
      users: this.userService.getUsers(), // Observable<User[]>
      events: this.eventService.getEvents() // Observable<Event[]>
    }).pipe(
      map(data => {
        const totalUsers = data.users.length;
  
        const userNames = data.users.map(user => `${user.firstName} ${user.lastName}`);
  
        const totalEvents = data.events.length;
        const events = data.events.map(event => ({
          photo: event.imgUrl, // This can now be undefined
          title: event.name,
          date: event.date,
          participants: event.participants
        }));
  
        console.log('User Names:', userNames);
        console.log('Events:', events);
  
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
  
  

  getExpenses(): Observable<{ id: number, description: string, amount: number }[]> {
    // Remplacez par un vrai appel à votre service de dépenses
    return of([
      { id: 1, description: 'Expense 1', amount: 100 },
      { id: 2, description: 'Expense 2', amount: 200 }
    ]);
  }

  deleteExpense(expenseId: number): Observable<{ success: boolean }> {
    // Remplacez par un vrai appel à votre service de dépenses
    return of({ success: true });
  }
}
