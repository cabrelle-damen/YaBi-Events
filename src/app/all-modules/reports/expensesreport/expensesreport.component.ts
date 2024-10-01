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
        this.events = response.data || [];
        console.log(this.events)
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load events: ' + err.message;
      }
    });
  }

  viewEventDetails(eventId: string): void {
    if (eventId) {
      this.router.navigate([`/events/details-Events/${eventId}`]);
    } else {
      console.error('Event ID is undefined');
    }
  }
}
