import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showCustomersLink: boolean = false;

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userData = JSON.parse(localStorage.getItem('LoginData') || '{}');
    if (userData.roles && userData.roles.includes('manage-users')) {
      this.showCustomersLink = true;
    }
  }
}
