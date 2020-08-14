import { Component, OnInit } from '@angular/core';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal = 0;
  cartObj = [];
  constructor(public shopService: ShopService) {}

  ngOnInit() {
    // console.log(JSON.parse(localStorage.getItem("cartItems")));
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    if(this.cartObj != null){
      this.cartTotal = 0;
      this.cartObj.forEach((item) => {
        this.cartTotal += item.qty * item.price;
      });
      console.log('total ', this.cartTotal);

      console.log('local storage', this.cartObj);
    }
    

  }

  createOrder() {
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    this.shopService.addOrders(this.cartObj, this.cartTotal);
  }
}
