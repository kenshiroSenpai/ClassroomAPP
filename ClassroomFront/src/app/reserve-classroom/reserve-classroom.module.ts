import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveClassroomPageRoutingModule } from './reserve-classroom-routing.module';

import { ReserveClassroomPage } from './reserve-classroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveClassroomPageRoutingModule
  ],
  declarations: [ReserveClassroomPage]
})
export class ReserveClassroomPageModule {}
