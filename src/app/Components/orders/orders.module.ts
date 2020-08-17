import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from "../../angular-material.component";


import { OrderListComponent } from './order-list/order-list.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';

@NgModule
({
  declarations: [
    OrderListComponent,
    MyOrdersComponent
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
