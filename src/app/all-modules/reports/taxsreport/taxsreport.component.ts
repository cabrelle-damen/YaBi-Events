import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxsreport',
  templateUrl: './taxsreport.component.html',
  styleUrls: ['./taxsreport.component.css'],
})
export class TaxsreportComponent implements OnInit {
  @Input() events: any[] = []; // Liste d'événements auxquels l'utilisateur participe
  qrCodeData: string = '';

  constructor() {}

  ngOnInit(): void {
    // Générer les QR codes pour chaque événement auquel l'utilisateur participe
    this.events.forEach(event => {
      if (event.participating) {
        event.qrCodeData = this.generateQRCodeData(event);
      }
    });
  }

  generateQRCodeData(event: any): string {
    const eventData = `
      Event: ${event.title}
      Start Date: ${event.startDate.toLocaleDateString()}
      End Date: ${event.endDate.toLocaleDateString()}
      Type: ${event.type}
      City: ${event.city}
      Location: ${event.location}
      Ticket Number: ${event.ticketNumber || Math.floor(Math.random() * 10000)}
      Price: $${event.pricePerSeat || 'Gratuit'}
    `;
    return eventData.trim();
  }
}
