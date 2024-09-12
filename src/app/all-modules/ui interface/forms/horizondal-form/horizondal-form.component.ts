import { Component, OnInit } from '@angular/core';
import { CertificationService } from 'src/app/services/certification.service';

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
  submissionMessage: string = '';

  constructor(private certificationService: CertificationService) { }

  ngOnInit(): void {}

  onProfilePhotoSelected(event: any) {
    this.profilePhoto = event.target.files[0];
  }

  onCNISelected(event: any) {
    this.cni = event.target.files[0];
  }

  onSubmit() {
    if (!this.profilePhoto || !this.cni) {
      // Handle invalid form case (profile photo or CNI missing)
      this.submissionMessage = 'Profile photo and CNI are required.';
      return;
    }

    // Show a message while verifying the information
    this.submissionMessage = 'Veuillez patienter, nous vérifions vos informations';

    // Simulate a submission with a delay
    setTimeout(() => {
      this.submissionMessage = 'Informations vérifiées. Votre formulaire a été soumis avec succès.';
      this.certificationService.setCertificationStatus(true);
    }, 3000);
  }
}
