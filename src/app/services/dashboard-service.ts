import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeycloakUserService } from './keycloak-user.service';
import { EventService } from './event-service';
import { Event } from 'src/app/modele/Event.modele';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private userService: KeycloakUserService,
    private eventService: EventService
  ) {}

  getDashboardStats(): Observable<{
    totalUsers: number,
    userNames: string[],
    totalEvents: number,
    totalParticipants: number,
    events: { photo: string | undefined, title: string, date: Date, participants: number }[]
  }> {
    return forkJoin({
      users: this.userService.getUsers(),
      events: this.eventService.getEvents() 
    }).pipe(
      map(data => {
        console.log('Users:', data.users);
        console.log('Events:', data.events);

        const totalUsers = data.users.length;
        
        const userNames = data.users.map(user => `${user.firstName} ${user.lastName}`);

        
        const eventsArray = Array.isArray(data.events.data) ? data.events.data : [];
        
        const events = eventsArray.map((event: Event) => ({
          photo: event.imgUrl, 
          title: event.name,   
          date: event.startDate, 
          participants: event.participants 
        }));

        const totalEvents = events.length;
        const totalParticipants = events.reduce((acc: number, event: { participants: number }) => acc + (event.participants || 0), 0);

        return {
          totalUsers,
          userNames,
          totalEvents,
          totalParticipants,
          events
        };
      })
    );
  }

  getExpenses(): Observable<{ id: number, description: string, amount: number }[]> {
    return of([
      { id: 1, description: 'Expense 1', amount: 100 },
      { id: 2, description: 'Expense 2', amount: 200 }
    ]);
  }

  deleteExpense(expenseId: number): Observable<{ success: boolean }> {
    return of({ success: true });
  }
}
