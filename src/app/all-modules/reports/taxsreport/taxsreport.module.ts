import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxsreportRoutingModule } from './taxsreport-routing.module';
import { TaxsreportComponent } from './taxsreport.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TaxsreportRoutingModule,
    DragDropModule,
    

  ]
})
export class TaxsreportModule { }
