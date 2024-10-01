import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/modele/Event.modele';
import { LieuService } from 'src/app/services/lieu.service';
import { Category } from 'src/app/modele/category.model';
import { CategoryService } from 'src/app/services/category-service';
import { EventService } from 'src/app/services/event-service';
import { Place } from 'src/app/modele/place.model'; // Assuming you have a Place model

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css'],
})
export class SalesreportComponent implements OnInit {
  events: Event[] = [];
  categories: Category[] = [];
  subcategories: string[] = [];  // Array to store subcategories of the selected category
  selectedEvent: Event | null = null;

  newEvent: Event = {
    name: '',
    description: '',
    category: { id: 0, name: '', subcategories: [] },  // Updated category initialization
    subcategory: '', 
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    organizer: '',
    country: '',
    city: '',
    numberOfPlaces: 0,
    pricePerSeat: 0,
    imgUrl: '',
    participants: 0,
    isFree: false,
    isOnline: false,
    eventPlace: []
  };

  countries: string[] = [];
  cities: string[] = [];
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    private lieuService: LieuService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.countries = this.lieuService.getCountries();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Method to handle category change
  onCategoryChange(): void {
    const selectedCategory = this.categories.find(cat => cat.id === this.newEvent.category.id);
    if (selectedCategory) {
      this.subcategories = selectedCategory.subcategories;
      this.newEvent.subcategory = '';  // Reset subcategory when category changes
    }
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  onCountryChange(): void {
    this.cities = this.lieuService.getCitiesByCountry(this.newEvent.country);
    this.newEvent.city = ''; // Reset city selection when country changes
  }

  createPlaceAndEvent(form: any): void {
    if (form.valid) {
      const place: Place = {
        name: this.newEvent.location,
        country: this.newEvent.country,
        city: this.newEvent.city,
      };
  
      // Create the place first
      this.lieuService.createPlace(place).subscribe(
        (createdPlace: Place) => {
          console.log("Place created successfully:", createdPlace);
  
          // Assign the createdPlace object to eventPlace
          this.newEvent.eventPlace = [createdPlace];  
  
          const eventToCreate: Event = {
            name: this.newEvent.name,
            description: this.newEvent.description,
            category: this.newEvent.category,
            subcategory: this.newEvent.subcategory,  // Handle the subcategory
            startDate: this.newEvent.startDate,
            endDate: this.newEvent.endDate,
            location: this.newEvent.location,
            organizer: this.newEvent.organizer,
            eventPlace: this.newEvent.eventPlace,
            country: this.newEvent.country,
            city: this.newEvent.city,
            numberOfPlaces: this.newEvent.numberOfPlaces,
            pricePerSeat: this.newEvent.pricePerSeat,
            imgUrl: this.newEvent.imgUrl,
            participants: this.newEvent.participants,
            isFree: this.newEvent.isFree,
            isOnline: this.newEvent.isOnline
          };
  
          // Now create the event
          this.eventService.createEvent(eventToCreate).subscribe(() => {
            this.loadEvents();  // Reload the event list
            this.resetForm();   // Reset the form after event creation
          });
        },
        (error) => {
          console.error("Error creating place:", error);
          this.errorMessage = "Failed to create place.";
        }
      );
    }
  }

  resetForm(): void {
    this.newEvent = {
      name: '',
      description: '',
      category: { id: 0, name: '', subcategories: [] },  // Reset category
      subcategory: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      organizer: '',
      country: '',
      city: '',
      numberOfPlaces: 0,
      pricePerSeat: 0,
      imgUrl: '',
      participants: 0,
      isFree: false,
      isOnline: false,
      eventPlace: [] 
    };
    this.selectedEvent = null;
    this.cities = [];
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // File upload logic can be added here
    }
  }
}
