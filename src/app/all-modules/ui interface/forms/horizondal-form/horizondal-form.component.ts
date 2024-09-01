import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizondal-form',
  templateUrl: './horizondal-form.component.html',
  styleUrls: ['./horizondal-form.component.css']
})
export class HorizondalFormComponent implements OnInit {

  artistName!: string;
  email!: string;
  gender!: string;
  profilePhoto!: File;
  cni!: File;
  submissionMessage: string = ''; // Pour afficher le message de soumission

  constructor() { }

  ngOnInit(): void {
  }

  onProfilePhotoSelected(event: any) {
    this.profilePhoto = event.target.files[0];
  }

  onCNISelected(event: any) {
    this.cni = event.target.files[0];
  }

  onSubmit() {
    // Afficher le message sur la page
    this.submissionMessage = 'Veuillez patienter, nous vérifions vos informations';
    
    // Simuler une soumission avec un délai (par exemple 3 secondes)
    setTimeout(() => {
      this.submissionMessage = 'Informations vérifiées. Votre formulaire a été soumis avec succès.';
    }, 3000);
  }
}
