import { Component, OnInit } from '@angular/core';
import { MockEventService } from 'src/app/services/mock-event.service';
import { Event } from 'src/app/modele/Event.modele';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expensesreport',
  templateUrl: './expensesreport.component.html',
  styleUrls: ['./expensesreport.component.css']
})
export class ExpensesreportComponent implements OnInit {
  events: Event[] = [];
  errorMessage: string = '';

  constructor(private eventService: MockEventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
      },
      error: (err: any) => {
        this.errorMessage = err;
      }
    });
  }

  viewEventDetails(eventId: string): void {
    this.router.navigate([`/profit-loss-report/${eventId}`]);
  }
  
}
