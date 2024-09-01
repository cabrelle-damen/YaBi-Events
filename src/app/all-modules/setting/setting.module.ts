import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingComponent,SidemenuComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ModalModule.forRoot(),RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingModule { }
