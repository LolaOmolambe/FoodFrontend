import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './Components/auth/auth.module';
import { AngularMaterialModule } from './angular-material.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
//import { ShopListItemComponent } from '../app/Components/shop/shop-list-item/shop-list-item.component';
//import { ProductCreateComponent } from './Components/products/product-create/product-create.component';
import { ProductsModule } from './Components/products/products.module';
import { AuthInterceptor } from './Components/auth/auth-interceptor';
import { OrdersModule } from './Components/orders/orders.module';
import { UsersModule } from './Components/user/user.module';
import { ShopModule } from './Components/shop/shop.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from '../error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { HomeProductsComponent } from './Components/home-products/home-products.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AdminReportComponent } from './Components/admin/admin-report/admin-report.component';
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
    ErrorComponent,
    HomeProductsComponent,
    ContactComponent,
    AdminReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    ShopModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
