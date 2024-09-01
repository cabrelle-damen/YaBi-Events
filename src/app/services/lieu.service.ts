import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LieuService {
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

  constructor() {}

  getCountries(): string[] {
    return Object.keys(this.countriesAndCities);
  }

  getCitiesByCountry(country: string): string[] {
    return this.countriesAndCities[country] || [];
  }
}
