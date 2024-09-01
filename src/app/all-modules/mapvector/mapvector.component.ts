import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  available: boolean;
}

@Component({
  selector: 'app-mapvector',
  templateUrl: './mapvector.component.html',
  styleUrls: ['./mapvector.component.css']
})
export class MapvectorComponent implements OnInit {
  locations: Location[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations = data;
        this.initMap();
      },
      (error) => {
        console.error('Erreur lors du chargement des lieux :', error);
      }
    );
  }

  initMap() {
    $('#world_map').vectorMap({
      map: 'world_mill',
      scaleColors: ['#03a9f4', '#03a9f4'],
      normalizeFunction: 'polynomial',
      hoverOpacity: 0.7,
      hoverColor: false,
      regionStyle: {
        initial: {
          fill: '#7638ff'
        }
      },
      backgroundColor: 'transparent',
      markers: this.locations.filter(loc => loc.available).map(loc => ({
        latLng: [loc.latitude, loc.longitude],
        name: loc.name
      })),
      onRegionOver: (event : string, code : string) => {
        // Optional: Handle region hover events
      }
    });
  }

  markLocationUnavailable(id: number) {
    this.locationService.markLocationAsUnavailable(id);
    // Optionally refresh the map or update the locations array
  }
}