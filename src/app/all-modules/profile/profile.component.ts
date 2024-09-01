import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  changePass = false;
  personalDetails = true;
  
  firstName!: string;
  lastName!: string;
  email!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
  }

  pass() {
    this.changePass = true;
    this.personalDetails = false;
  }

  editModal() {
    // Logic for opening the edit modal
  }

  update() {
    // Logic for updating user details
  }

  submit() {
    this.router.navigateByUrl('/admin/mentor-profile');
  }

  getUserDetails() {
    const userProfile = this.authService.getUserProfile();
    if (userProfile) {
      this.firstName = userProfile.firstName;
      this.lastName = userProfile.lastName;
      this.email = userProfile.email;
    } else {
      console.error('Error fetching user profile');
    }
  }
}
