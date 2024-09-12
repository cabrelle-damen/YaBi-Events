import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ExpensesreportComponent } from './expensesreport/expensesreport.component';
import { ProfitlossreportComponent } from './profitlossreport/profitlossreport.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TaxsreportComponent } from './taxsreport/taxsreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ReportsComponent,
    ExpensesreportComponent,
    ProfitlossreportComponent,
    SalesreportComponent,
    TaxsreportComponent,
    
    

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DataTablesModule,
    FormsModule,
    DragDropModule,
    QRCodeModule
  ]
})
export class ReportsModule { }
