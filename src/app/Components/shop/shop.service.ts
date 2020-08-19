import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/order/';

@Injectable({ providedIn: 'root' })
export class ShopService {
  count = 0;
  simpleObservable = new Subject();
  simpleObservables = this.simpleObservable.asObservable();
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
    if (JSON.parse(localStorage.getItem('cartItems')) != null) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }
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

    if (this.cartItems != null) {
      this.count = this.cartItems.length;
      this.simpleObservable.next(this.count);
    }
    console.log(this.cartItems);
  }

  addOrders(orders: any[], total: Number) {
    let productData = {
      orders,
      total,
    };
    this.http
      .post<{ message: string; status: string; orderId: string }>(
        BACKEND_URL,
        productData
      )
      .subscribe((responseData) => {
        console.log(responseData);
        //console.log("donnnnnn");
        if (responseData.status === 'success') {
          this.payOrders(responseData.orderId);

          //localStorage.removeItem('cartItems');
          //this.router.navigate(['thankyou']);
        }
      });
  }

  removeOrder(cartObj) {
    this.count = cartObj.length;
    console.log('shop service count ', this.count);
    this.simpleObservable.next(this.count);
  }

  getCountOfCart() {
    return this.simpleObservables;
  }

  payOrders(orderId) {
    this.http
      .get<{ session; status: string }>(
        BACKEND_URL + 'checkout-session/' + orderId
      )
      .subscribe((responseData) => {
        console.log(responseData);
        //console.log("donnnnnn");
        stripe.redirectToCheckout({
          sessionId: responseData.session.id,
        });
        // if (responseData.status === 'success') {
        //   localStorage.removeItem('cartItems');
        //   this.router.navigate(['thankyou']);
        // }
      });
  }

  updateProduct(orderId: string, status: string) {
    let statusData = {
      status: status,
    };

    console.log(statusData);

    this.http
      .put<{ status: string; message: string }>(BACKEND_URL + orderId, statusData)
      .subscribe((response) => {
        if (response.status == 'success') {
          this.router.navigate(['/']);
        }
        //this.router.navigate(['/']);
      });
  }
}

