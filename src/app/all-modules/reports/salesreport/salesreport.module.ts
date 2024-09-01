import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesreportRoutingModule } from './salesreport-routing.module';
import { SalesreportComponent } from './salesreport.component';
import { FormsModule } from '@angular/forms';
import { EventService } from 'src/app/services/event-service';
import { MockEventService } from 'src/app/services/mock-event.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SalesreportRoutingModule,
    FormsModule,  // Add this line

  ],
  providers: [{ provide: EventService, useClass: MockEventService }]

})
export class SalesreportModule { }
