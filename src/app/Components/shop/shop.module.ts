import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AngularMaterialModule} from '../../angular-material.component';

import { ShopListComponent } from './shop-list/shop-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ShopListItemComponent } from './shop-list-item/shop-list-item.component';

@NgModule
({
  declarations: [
    ShopListComponent,
    CartComponent,
    CheckoutComponent,
    CartItemComponent,
    ShopListItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,

  ],
})

export class ShopModule {

}
