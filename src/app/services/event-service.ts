import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/modele/Event.modele';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://192.168.1.68:3000/event';

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event._id}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  submitEvent(eventId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/submit`, {});
  }

  participateEvent(eventId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subscribe/${eventId}`, {});
  }

  getEvent(eventId: string): Observable<{ event: Event; isParticipating: boolean }> {
    return this.http.get<{ event: Event; isParticipating: boolean }>(`${this.apiUrl}/${eventId}`);
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
