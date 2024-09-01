import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.css']
})
export class LieuComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit(): void { }

  addLieu(): void {
    // Ajouter logique pour envoyer les coordonnées et autres informations du lieu au backend.
  }
}
