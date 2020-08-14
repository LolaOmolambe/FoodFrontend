import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from "../../angular-material.component";


import { OrderListComponent } from './order-list/order-list.component';

@NgModule
({
  declarations: [
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
})

export class OrdersModule {

}
