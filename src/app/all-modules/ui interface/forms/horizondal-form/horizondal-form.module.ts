import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizondalFormRoutingModule } from './horizondal-form-routing.module';
import { RouterModule } from '@angular/router';
import { HorizondalFormComponent } from './horizondal-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HorizondalFormComponent],
  imports: [
    CommonModule,
    HorizondalFormRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class HorizondalFormModule { }
