import { Component, OnInit } from '@angular/core';
import { KeycloakUserService } from 'src/app/services/keycloak-user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: any[] = [];
  errorMessage: string | null = null;
  public tempId: string | null = null;

  constructor(private keycloakUserService: KeycloakUserService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.keycloakUserService.getUsers().subscribe(
      (res: any[]) => {
        this.customers = res;
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }

  filter() {}

  deleteCustomer(id: string) {
    // this.keycloakUserService.updateUser(id, { enabled: true }).subscribe(() => {
    //   this.getCustomers();
    // });
  }

  activateUser(id: string): void {
    this.keycloakUserService.updateUser(id, { enabled: true }).subscribe(() => {
      this.getCustomers();
    });
  }

  deactivateUser(id: string): void {
    this.keycloakUserService.updateUser(id, { enabled: false }).subscribe(() => {
      this.getCustomers();
    });
  }
}
  

