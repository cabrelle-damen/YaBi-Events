import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../services/common-service.service';
import { Event } from 'src/app/modele/Event.modele';
import { MockEventService } from 'src/app/services/mock-event.service';
import { LieuService } from 'src/app/services/lieu.service';
import { Category } from 'src/app/modele/category.model';
import { CategoryService } from 'src/app/services/category-service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css'],
})
export class SalesreportComponent implements OnInit {
  events: Event[] = [];
  categories: Category[] = [];
  selectedEvent: Event | null = null;
  
  newEvent: Event = {
    id: '',
    title: '',
    description: '',
    category: { id: 0, name: '' },
    type: 'private', // Peut maintenant être modifié par l'utilisateur
    status: 'draft',
    date: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    startTime: '', // Nouveaux champs pour l'heure de début
    endTime: '',   // Nouveaux champs pour l'heure de fin
    location: '',
    organizer: '',
    country: '',
    city: '',
    numberOfSeats: 0,
    pricePerSeat: 0,
    photo: '',
    participants: 0,
  };

  countries: string[] = [];
  cities: string[] = [];
  errorMessage: string = '';

  constructor(
    private commonService: CommonServiceService,
    private mockEventService: MockEventService,
    private categoryService: CategoryService,
    private lieuService: LieuService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
    this.countries = this.lieuService.getCountries();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadEvents(): void {
    this.mockEventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  onCountryChange(): void {
    this.cities = this.lieuService.getCitiesByCountry(this.newEvent.country);
    this.newEvent.city = '';
  }

  createEvent(form: any): void {
    if (form.valid) {
      this.mockEventService.createEvent(this.newEvent).subscribe(() => {
        this.loadEvents();
        this.resetForm();
      });
    }
  }

  editEvent(event: Event): void {
    this.selectedEvent = event;
    this.newEvent = { ...event };
    this.onCountryChange();
  }

  deleteEvent(id: number): void {
    this.mockEventService.deleteEvent(id.toString()).subscribe(() => {
      this.loadEvents();
    });
  }

  submitEvent(id: number): void {
    this.mockEventService.submitEvent(id.toString()).subscribe(() => {
      this.loadEvents();
    });
  }

  resetForm(): void {
    this.newEvent = {
      id: '',
      title: '',
      description: '',
      category: { id: 0, name: '' },
      type: 'private',
      status: 'draft',
      date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      startTime: '', 
      endTime: '',
      location: '',
      organizer: '',
      country: '',
      city: '',
      numberOfSeats: 0,
      pricePerSeat: 0,
      photo: '',
      participants: 0,
    };
    this.selectedEvent = null;
    this.cities = [];
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newEvent.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
