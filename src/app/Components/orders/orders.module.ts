import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from "../../angular-material.component";


import { OrderListComponent } from './order-list/order-list.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import { OrderUpdateComponent } from './order-update/order-update.component';

@NgModule
({
  declarations: [
    OrderListComponent,
    MyOrdersComponent,
    OrderUpdateComponent
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
