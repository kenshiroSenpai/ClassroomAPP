import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservePageRoutingModule } from './my-reserve-routing.module';

import { MyReservePage } from './my-reserve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReservePageRoutingModule
  ],
  declarations: [MyReservePage]
})
export class MyReservePageModule {}
