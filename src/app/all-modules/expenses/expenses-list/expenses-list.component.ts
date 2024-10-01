import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service';
import * as ApexCharts from 'apexcharts';

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
        console.log('Dashboard Stats:', this.dashboardStats);  // Vérifiez la structure ici
        if (this.dashboardStats && this.dashboardStats.events) {
          this.renderCharts(); // Assurez-vous d'appeler le rendu uniquement si les données sont présentes
        } else {
          console.error('Données du dashboard incorrectes ou incomplètes');
        }
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

  renderCharts(): void {
    if (!this.dashboardStats || !this.dashboardStats.events) {
      console.error('Les statistiques du tableau de bord sont manquantes ou incorrectes');
      return;
    }
  
    const totalUsers = this.dashboardStats.totalUsers || 0;
    const totalEvents = this.dashboardStats.totalEvents || 0;
  
    // Donut Chart for Users and Events
    const optionsDonut = {
      colors: ['#7638ff', '#ff737b'],
      series: [totalUsers, totalEvents],
      chart: {
        height: 350,
        type: 'donut',
      },
      labels: ['Utilisateurs', 'Événements'],
      legend: { show: false },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  
    const chartDonut = new ApexCharts(document.querySelector("#users_events_chart"), optionsDonut);
    chartDonut.render();
  
    // Vérifiez que les événements existent et contiennent des participants
    const events = this.dashboardStats.events || [];
    const participants = events.map((event: any) => event.participants || 0);
    const titles = events.map((event: any) => event.title || 'Sans titre');
  
    // Bar Chart for Participants in Events
    const optionsBar = {
      colors: ['#7638ff', '#fda600'],
      series: [
        {
          name: "Participants",
          data: participants
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded'
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: titles,
      },
      yaxis: {
        title: {
          text: 'Participants'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + " participants";
          }
        }
      }
    };
  
    const chartBar = new ApexCharts(document.querySelector("#events_participants_chart"), optionsBar);
    chartBar.render();
  }
  
}
