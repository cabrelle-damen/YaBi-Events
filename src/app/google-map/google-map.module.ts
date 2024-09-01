import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LieuComponent } from './lieu/lieu.component';
import { LieuxListComponent } from './lieux-list/lieux-list.component';



@NgModule({
  declarations: [
    LieuComponent,
    LieuxListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GoogleMapModule { }
