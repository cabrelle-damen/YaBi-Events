import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesreportComponent } from './expensesreport/expensesreport.component';
import { ProfitlossreportComponent } from './profitlossreport/profitlossreport.component';
import { ReportsComponent } from './reports.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TaxsreportComponent } from './taxsreport/taxsreport.component';
import { AuthenticationGuard } from 'src/app/core/auth/authentication.guard';

const routes: Routes = [
  {path:'',component:ReportsComponent,
  children: [
    { path: "sales-report", component: SalesreportComponent },
    { path: "expenses-report", component: ExpensesreportComponent},
    { path: "profit-loss-report", component: ProfitlossreportComponent},
    { 
      path: 'profit-loss-report/:id', 
      component: ProfitlossreportComponent,
      canActivate: [AuthenticationGuard]  
    },

    { path: "taxs-report", component: TaxsreportComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
