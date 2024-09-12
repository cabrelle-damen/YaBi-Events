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
    { path: "creer-Event", component: SalesreportComponent },
    { path: "list-Events", component: ExpensesreportComponent},
    { path: "details-Events", component: ProfitlossreportComponent},
    { 
      path: 'details-Events/:id', 
      component: ProfitlossreportComponent,
      canActivate: [AuthenticationGuard]  
    },

    { path: "billet", component: TaxsreportComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
