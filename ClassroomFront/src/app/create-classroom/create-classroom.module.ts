import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateClassroomPageRoutingModule } from './create-classroom-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClassroomPage } from './create-classroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateClassroomPageRoutingModule
  ],
  declarations: [CreateClassroomPage]
})
export class CreateClassroomPageModule {}
