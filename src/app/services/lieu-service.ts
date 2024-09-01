import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LieuService {
  private lieux = [
    { id: 1, name: 'Palais de sports', lat: 37.7749, lng: -122.4194, available: true },
    { id: 2, name: 'Place de fête', lat: 37.7849, lng: -122.4294, available: false },
    // Ajoutez plus de lieux ici
  ];

  constructor() { }

  getLieux(): Observable<any[]> {
    return of(this.lieux);
  }

  addLieu(lieu: any): Observable<void> {
    this.lieux.push({ ...lieu, id: this.lieux.length + 1 });
    return of();
  }

  updateLieu(id: number, updatedLieu: any): Observable<void> {
    const index = this.lieux.findIndex(lieu => lieu.id === id);
    if (index > -1) {
      this.lieux[index] = { ...this.lieux[index], ...updatedLieu };
    }
    return of();
  }

  deleteLieu(id: number): Observable<void> {
    this.lieux = this.lieux.filter(lieu => lieu.id !== id);
    return of();
  }
}
