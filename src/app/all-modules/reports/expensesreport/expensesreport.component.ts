import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/modele/Event.modele';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event-service';

@Component({
  selector: 'app-expensesreport',
  templateUrl: './expensesreport.component.html',
  styleUrls: ['./expensesreport.component.css']
})
export class ExpensesreportComponent implements OnInit {
  events: Event[] = [];
  errorMessage: string = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (response: any) => {
        // Les événements sont dans la clé 'data' de la réponse
        this.events = response.data || [];
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load events: ' + err.message;
      }
    });
  }
  
  
  


  viewEventDetails(eventId: string): void {
    this.router.navigate([`/details-Events/${eventId}`]);
  }
}
