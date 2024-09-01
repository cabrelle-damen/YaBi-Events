import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  messages: any = '';
  SERVER_URL: string = 'http://localhost:8080/api/';
  message: BehaviorSubject<String>;

  constructor(public http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }

  nextmessage(data: any) {
    this.message.next(data);
  }

  // Kanakku services
  getCustomers() {
    return this.http.get(this.SERVER_URL + 'customers');
  }

  getEstimates() {
    return this.http.get(this.SERVER_URL + 'estimates');
  }

  getInvoices() {
    return this.http.get(this.SERVER_URL + 'invoices');
  }

  getPayments() {
    return this.http.get(this.SERVER_URL + 'payments');
  }

  getExpenses() {
    return this.http.get(this.SERVER_URL + 'expenses');
  }

  // Method to check if the user is an admin
  isUserAdmin(userId: number): boolean {
    const user = this.customers.find((customer) => customer.id === userId);
    return user?.role === 'Admin';
  }

  payments = [ /* Vos objets de paiement ici */ ];

  customers: Customer[] = [ /* Vos objets clients ici */ ];
}

// Définition de l'interface Customer
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  img: string;
  amount_due: string;
  registered_on: string;
  status: string;
  role: string;
}
