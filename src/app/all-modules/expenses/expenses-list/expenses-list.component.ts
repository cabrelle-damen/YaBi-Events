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
        this.renderCharts(); // Appeler la méthode pour rendre les graphiques
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
    // Donut Chart for Users and Events
    var optionsDonut = {
      colors: ['#7638ff', '#ff737b', '#fda600', '#1ec1b0'],
      series: [this.dashboardStats.totalUsers, this.dashboardStats.totalEvents],
      chart: {
        height: 350,
        type: 'donut',
      },
      labels: ['Users', 'Events'],
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

    var chartDonut = new ApexCharts(document.querySelector("#users_events_chart"), optionsDonut);
    chartDonut.render();

    // Bar Chart for Participants in Events
    var optionsBar = {
      colors: ['#7638ff', '#fda600'],
      series: [
        {
          name: "Participants",
          data: this.dashboardStats.events.map((event: any) => event.participants)
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
        categories: this.dashboardStats.events.map((event: any) => event.title),
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

    var chartBar = new ApexCharts(document.querySelector("#events_participants_chart"), optionsBar);
    chartBar.render();
  }
}
