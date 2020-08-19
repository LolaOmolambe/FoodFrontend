import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { ProductCreateComponent } from './Components/products/product-create/product-create.component';
import { ProductListComponent } from './Components/products/product-list/product-list.component';
import { OrderListComponent } from './Components/orders/order-list/order-list.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { ShopListComponent } from './Components/shop/shop-list/shop-list.component';
import { CartComponent } from './Components/shop/cart/cart.component';
import { CheckoutComponent } from './Components/shop/checkout/checkout.component';
import { AuthGuard } from './Components/auth/auth.guard';
import { ThankYouComponent } from '../app/Components/shop/thank-you/thank-you.component';
import {MyOrdersComponent} from '../app/Components/orders/my-orders/my-orders.component';
import {OrderUpdateComponent} from '../app/Components/orders/order-update/order-update.component';
import { UserAccountComponent } from "../app/Components/user/user-account/user-account.component";
//import {StripePaymentComponent} from './Components/shop/stripe-payment/stripe-payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'addproduct',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productlist',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:productId',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orderlist',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'userlist', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'shoplist', component: ShopListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'thankyou/:orderId', component: ThankYouComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'updateOrder/:orderId', component: OrderUpdateComponent, canActivate: [AuthGuard] },
  { path: 'useraccount', component: UserAccountComponent, canActivate: [AuthGuard]  },
  {
    path: '**', // bonus: all routes not defined forward to /home
    redirectTo: 'home'
  }

  //{ path: 'stripe', component: StripePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
