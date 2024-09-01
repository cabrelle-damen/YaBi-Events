import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/modele/Event.modele';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://api.example.com/events'; // URL de l'API

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  submitEvent(eventId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/submit`, {});
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
