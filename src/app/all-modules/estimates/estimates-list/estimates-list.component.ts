import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { LieuService } from 'src/app/services/lieu-service'; // Importer le service LieuService

@Component({
  selector: 'app-estimates-list',
  templateUrl: './estimates-list.component.html',
  styleUrls: ['./estimates-list.component.css']
})
export class EstimatesListComponent implements OnInit {
  public estimates: any = [];
  public lieux: any[] = [];
  public newLieu = { name: '', lat: '', lng: '' };
  public errorMessage: any;
  public url: any = "estimates";
  public tempId: any;

  constructor(private srvModuleService: AllModulesService, private lieuService: LieuService) { }

  ngOnInit(): void {
    this.getEstimates();
    this.getLieux(); // Récupérer les lieux d'événements
  }

  getEstimates() {
    this.estimates = this.srvModuleService.estimates;
    // this.srvModuleService.get(this.url).subscribe((res) => {
    //   this.estimates = res;
    // },
    // );
  }

  deleteEstimates() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getEstimates();
    });
  }

  // Méthodes pour la gestion des lieux d'événements
  getLieux(): void {
    this.lieuService.getLieux().subscribe(lieux => this.lieux = lieux);
  }

  addLieu(): void {
    this.lieuService.addLieu(this.newLieu).subscribe(() => {
      this.getLieux();
      this.newLieu = { name: '', lat: '', lng: '' };
    });
  }

  toggleAvailability(id: number): void {
    const lieu = this.lieux.find(l => l.id === id);
    if (lieu) {
      this.lieuService.updateLieu(id, { available: !lieu.available }).subscribe(() => this.getLieux());
    }
  }

  deleteLieu(id: number): void {
    this.lieuService.deleteLieu(id).subscribe(() => this.getLieux());
  }
}
