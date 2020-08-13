import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthModule} from './Components/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
//import { ProductCreateComponent } from './Components/products/product-create/product-create.component';
import {ProductsModule} from './Components/products/products.module';
import {AuthInterceptor} from './Components/auth/auth-interceptor';
import {OrdersModule} from './Components/orders/orders.module';
import {UsersModule} from './Components/user/user.module';
import { ShopModule } from "./Components/shop/shop.module";
//import { CartItemComponent } from './Components/Cart/cart-item/cart-item.component';
//import { UserListComponent } from './Components/User/user-list/user-list.component';
//import { ShopListComponent } from './Components/shop/shop-list/shop-list.component';
//import { OrderListComponent } from './Components/Orders/order-list/order-list.component';
//import { ProductListComponent } from './Components/prodcts/product-list/product-list.component';
//import { LoginComponent } from './Components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    //CartItemComponent,
    //ShopListComponent,
    //UserListComponent,
    //OrderListComponent,
    //ProductListComponent,
    //ProductCreateComponent,
    //LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    ShopModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
