import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/order/';

@Injectable({ providedIn: 'root' })
export class ShopService {
  subject = new Subject();
  //subject = new Subscription();
  cartItems = [];
  cartTotal = 0;

  constructor(private http: HttpClient, private router: Router) {}

  sendMsg(product) {
    console.log('Here');
    this.addProductToCart(product);

    //console.log(product);
    this.subject.next(product); //Triggering an event
  }

  getMsg() {
    //console.log("sendMsg")
    return this.subject.asObservable();
  }

  addProductToCart(product: any) {
    let productExists = false;
    console.log('hereeeeee');

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;
        this.cartItems[i].total += this.cartItems[i].price;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price,
        imagePath: product.imagePath,
        total: product.price,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    //console.log(this.cartItems);
    this.cartTotal = 0;
    this.cartItems.forEach((item) => {
      this.cartTotal += item.quantity * item.price;
    });
    //localStorage.setItem("cartTotal", JSON.stringify(this.cartTotal));
  }

  addOrders(orders: any[], total: Number) {
    let productData = {
      orders,
      total,
    };
    this.http
      .post<{ message: string, status: string }>(BACKEND_URL, productData)
      .subscribe((responseData) => {
        console.log(responseData);
        //console.log("donnnnnn");
        if(responseData.status === "success"){
          localStorage.removeItem('cartItems');
          this.router.navigate(['thankyou']);
        }

      });
  }
}
