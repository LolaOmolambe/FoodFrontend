import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal = 0;
  cartObj = [];
  constructor() {}

  ngOnInit() {
    // console.log(JSON.parse(localStorage.getItem("cartItems")));
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    //console.log(this.cartObj.length);
    this.cartTotal = 0;
    this.cartObj.forEach((item) => {
      this.cartTotal += item.qty * item.price;
    });
    console.log('total ', this.cartTotal);
    console.log('local storage', this.cartObj);
  }
}
