import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/modele/Event.modele';
import { EventService } from 'src/app/services/event-service';

@Component({
  selector: 'app-profitlossreport',
  templateUrl: './profitlossreport.component.html',
  styleUrls: ['./profitlossreport.component.css'],
})
export class ProfitlossreportComponent implements OnInit {
  event: Event | null = null;
  errorMessage: string = '';
  participating = false;
  eventId: string | null = null;  // Store the event ID from the route


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log('Event ID from route:', eventId);
  
    if (eventId) {
      this.eventService.getEvent(eventId).subscribe({
        next: (data: any) => {
          console.log("Full backend response:", data); 
          this.event = data.data;
          console.log("Event details:", this.event); 
        },
        error: (err: any) => {
          this.errorMessage = 'Erreur lors de la récupération des détails de l\'événement';
          console.error('Erreur de récupération:', err);
        },
      });
    } else {
      this.errorMessage = 'ID de l\'événement non valide';
    }
  }
  
  participate(): void {
    if (this.event?._id) {
      this.eventService.participateEvent(this.event._id).subscribe({
        next: (response: any) => {
          console.log('Participation réussie', response);
          this.participating = true;
          if (this.event) {
            this.event.participants += 1; // Augmentation du nombre de participants
          }
        },
        error: (err) => {
          console.error('Erreur lors de la participation', err);
          this.errorMessage = 'Erreur lors de la participation';
        }
      });
    }
  }
  

  get participationPercentage(): number {
    if (this.event) {
      return (this.event.participants! / this.event.numberOfPlaces!) * 100;
    }
    return 0;
  }
}