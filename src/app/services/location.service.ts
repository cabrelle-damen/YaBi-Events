import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationsUrl = '/assets/data/public-locations.json';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl);
  }

  markLocationAsUnavailable(id: number): void {
    this.getLocations().subscribe(locations => {
      const location = locations.find(loc => loc.id === id);
      if (location) {
        location.available = false;
        // Si vous avez une API, vous pourriez envoyer la mise à jour ici
        // return this.http.put(`${this.locationsUrl}/${id}`, location);
      }
    });
  }
}
