import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  expenses: any[] = [];
  dashboardStats: any;
  tempId: number | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.loadDashboardStats();
  }

  loadExpenses(): void {
    this.dashboardService.getExpenses().subscribe(
      data => {
        this.expenses = data;
      },
      error => {
        console.error('Erreur lors de la récupération des dépenses', error);
      }
    );
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe(
      data => {
        this.dashboardStats = data;
        console.log('Dashboard Stats:', this.dashboardStats); // Pour déboguer
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
  }

  deleteExpense(tempId: number | null): void {
    if (tempId !== null) {
      this.dashboardService.deleteExpense(tempId).subscribe(
        response => {
          if (response.success) {
            this.expenses = this.expenses.filter(expense => expense.id !== tempId);
          }
        },
        error => {
          console.error('Erreur lors de la suppression de la dépense', error);
        }
      );
    } else {
      console.error('tempId is null, cannot delete expense');
    }
  }
}