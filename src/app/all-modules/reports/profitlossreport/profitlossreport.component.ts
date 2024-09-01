import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockEventService } from 'src/app/services/mock-event.service';
import { Event } from 'src/app/modele/Event.modele';

@Component({
  selector: 'app-profitlossreport',
  templateUrl: './profitlossreport.component.html',
  styleUrls: ['./profitlossreport.component.css'],
})
export class ProfitlossreportComponent implements OnInit {
  event: Event | null = null;
  errorMessage: string = '';
  participating = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: MockEventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEvent(eventId).subscribe({
        next: (data: Event) => {
          this.event = data;
        },
        error: (err: any) => {
          this.errorMessage = err;
        },
      });
    }
  }

  participate(): void {
    if (this.event && this.event.participants! < this.event.numberOfSeats!) {
      this.event.participants++; // Increment participants
      this.participating = true;
    }
  }

  get participationPercentage(): number {
    if (this.event) {
      return (this.event.participants! / this.event.numberOfSeats!) * 100;
    }
    return 0;
  }
}