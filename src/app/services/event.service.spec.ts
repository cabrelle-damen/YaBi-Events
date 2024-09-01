import { TestBed } from '@angular/core/testing';
import { MockEventService } from './mock-event.service';
import { Event } from 'src/app/modele/Event.modele';

describe('MockEventService', () => {
  let service: MockEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an event', () => {
    const testEvent: Event = {
      id: '1',
      title: 'Test Event',
      description: 'This is a test event',
      category: 'Conférence', // Ajout de la catégorie
      type: 'public',
      status: 'draft',
      date: new Date(),
      startDate: new Date(), // Ajout de la date de début
      endDate: new Date(), // Ajout de la date de fin
      location: 'Douala',
      organizer: 'Organizer Name',
      country: 'Cameroun', // Ajout du pays
      city: 'Douala', // Ajout de la ville
      numberOfSeats: 100, // Ajout du nombre de places
      pricePerSeat: 20, // Ajout du coût par place
      photo: '', // Ajout de la photo
    };

    service.createEvent(testEvent).subscribe((event) => {
      expect(event).toEqual(testEvent);
    });
  });
  
  // Ajoutez d'autres tests ici pour les mises à jour, suppressions, etc.
});
