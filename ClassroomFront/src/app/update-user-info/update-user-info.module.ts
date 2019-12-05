import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserInfoPageRoutingModule } from './update-user-info-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserInfoPage } from './update-user-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateUserInfoPage]
})
export class UpdateUserInfoPageModule {}
