import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../modele/place.model';

@Injectable({
  providedIn: 'root',
})
export class LieuService {
  private apiUrl = 'http://192.168.1.68:3000/event-place/create'
  private countriesAndCities: { [key: string]: string[] } = {
     Cameroon : [
      'Bafang',
      'Bafoussam',
      'Bali',
      'Bamenda',
      'Bana',
      'Bangangté',
      'Banyo',
      'Batouri',
      'Bertoua',
      'Bogo',
      'Buéa',
      'Douala',
      'Dschang',
      'Ebolowa',
      'Edéa',
      'Foumban',
      'Foumbot',
      'Garoua',
      'Guider',
      'Kousséri',
      'Kumba',
      'Kribi',
      'Kumbo',
      'Limbe',
      'Loum',
      'Maroua',
      'Mbalmayo',
      'Mbanga',
      'Meiganga',
      'Mokolo',
      'Mora',
      'Mutengene',
      'Nanga Eboko',
      'Ngaoundéré',
      'Nkongsamba',
      'Sangmélima',
      'Tibati',
      'Tiko',
      'Wum',
      'Yaoundé',
      'Yokadouma'
    ],
    Congo : [
      'Brazzaville',
      'Dolisie',
      'Impfondo',
      'Kinkala',
      'Madingou',
      'Mossendjo',
      'Nkayi',
      'Ouesso',
      'Pointe-Noire',
      'Sibiti'
    ]
    ,
     Gabon :[
      'Franceville',
      'Koulamoutou',
      'Lambaréné',
      'Libreville',
      'Makokou',
      'Mouila',
      'Ndendé',
      'Oyem',
      'Port-Gentil',
      'Tchibanga'
    ]
    
  };

  constructor(private http: HttpClient) {}

  getCountries(): string[] {
    return Object.keys(this.countriesAndCities);
  }

  getCitiesByCountry(country: string): string[] {
    return this.countriesAndCities[country] || [];
  }
  private getAuthToken(): string {
    return localStorage.getItem('authToken') || ''; // Or wherever your token is stored
  }

  createPlace(place: Place): Observable<Place> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Add your auth token here
    });
    return this.http.post<Place>(this.apiUrl, place, { headers });
  }
  
}
