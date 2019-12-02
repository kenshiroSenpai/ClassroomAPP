import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyReservePage } from './my-reserve.page';

const routes: Routes = [
  {
    path: '',
    component: MyReservePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReservePageRoutingModule {}
