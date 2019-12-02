import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveClassroomPage } from './reserve-classroom.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveClassroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveClassroomPageRoutingModule {}
