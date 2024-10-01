import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/modele/Event.modele';

@Injectable({
  providedIn: 'root'
})
export class MockEventService {
  
  private mockEvents: Event[] = [
    // {
    //   id: '1',
    //   title: 'Réunion de l\'entreprise',
    //   description: 'Prise de connaissance des états d\'avancement',
    //   category: [{ id: 1, name: 'Conférence' }],
    //   type: 'public',
    //   status: 'draft',
    //   date: new Date(),
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   location: 'Bangangté',
    //   organizer: 'Yaba-In',
    //   country: 'Cameroon',
    //   city: 'Bangangté',
    //   numberOfSeats: 100,
    //   participants: 50,
    //   pricePerSeat: 0,
    //   photo: 'assets/images1/logo_yabi.png',
    //   startTime: '09:00', // Ajout de l'heure de début
    //   endTime: '17:00' // Ajout de l'heure de fin
    // },
    // {
    //   id: '2',
    //   title: 'Mariage Cabrelle',
    //   description: 'Si tu ne veux pas de problème ne tombe pas amoureux',
    //   category: [{ id: 1, name: 'Conférence' }],
    //   type: 'private',
    //   status: 'submitted',
    //   date: new Date(),
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   location: 'Bangoulap',
    //   organizer: 'DAMEN',
    //   country: 'Cameroon',
    //   city: 'Bangoulap',
    //   numberOfSeats: 200,
    //   participants: 150,
    //   pricePerSeat: 50,
    //   photo: 'assets/images1/cabrelle.jpg',
    //   startTime: '10:00',
    //   endTime: '18:00'
    // },
    // {
    //   id: '3',
    //   title: 'Réunion de l\'entreprise',
    //   description: 'Prise de connaissance des états d\'avancement',
    //   category: [{ id: 1, name: 'Conférence' }],
    //   type: 'public',
    //   status: 'draft',
    //   date: new Date(),
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   location: 'Bangangté',
    //   organizer: 'Yaba-In',
    //   country: 'Cameroon',
    //   city: 'Bangangté',
    //   numberOfSeats: 100,
    //   participants: 60,
    //   pricePerSeat: 0,
    //   photo: 'assets/images1/yaba.jpg',
    //   startTime: '08:00',
    //   endTime: '16:00'
    // },
    // {
    //   id: '4',
    //   title: 'Soutenance de DJOUMI FALONNE',
    //   description: 'Si tu ne veux pas de problème ne tombe pas amoureux',
    //   category: { id: 1, name: 'Atelier' },
    //   type: 'private',
    //   status: 'submitted',
    //   date: new Date(),
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   location: 'Bangangter',
    //   organizer: 'DAMEN',
    //   country: 'Cameroon',
    //   city: 'Bangangter',
    //   numberOfSeats: 200,
    //   participants: 100,
    //   pricePerSeat: 50,
    //   photo: 'assets/images1/djoumi.jpg',
    //   startTime: '11:00',
    //   endTime: '19:00'
    // },
  ];

  // Les méthodes CRUD suivent...

  createEvent(event: Event): Observable<Event> {
    const idevent = this.mockEvents.length + 1;
    event._id = idevent.toString();
    this.mockEvents.push(event);
    return of(event);
  }

  updateEvent(event: Event): Observable<Event> {
    const index = this.mockEvents.findIndex(e => e._id === event._id);
    if (index !== -1) {
      this.mockEvents[index] = event;
    }
    return of(event);
  }

  deleteEvent(eventId: string): Observable<void> {
    this.mockEvents = this.mockEvents.filter(e => e._id !== eventId);
    return of();
  }

  // submitEvent(eventId: string): Observable<Event> {
  //   const event = this.mockEvents.find(e => e._id === eventId);
  //   if (event) {
  //     event.status = 'submitted';
  //     return of(event);
  //   } else {
  //     return of({} as Event);
  //   }
  // }

  getEvent(eventId: string): Observable<Event> {
    const event = this.mockEvents.find(e => e._id === eventId);
    return of(event || {} as Event);
  }

  getEvents(): Observable<Event[]> {
    return of(this.mockEvents);
  }
}
