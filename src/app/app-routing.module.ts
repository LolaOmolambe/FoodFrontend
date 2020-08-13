import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { ProductCreateComponent } from './Components/products/product-create/product-create.component';
import { ProductListComponent } from './Components/products/product-list/product-list.component';
import { OrderListComponent } from './Components/orders/order-list/order-list.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { ShopListComponent } from "./Components/shop/shop-list/shop-list.component";
import { CartComponent } from "./Components/shop/cart/cart.component";
import { CheckoutComponent } from "./Components/shop/checkout/checkout.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addproduct', component: ProductCreateComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'edit/:productId', component: ProductCreateComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'shoplist', component: ShopListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
