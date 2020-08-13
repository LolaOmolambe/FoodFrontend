import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
//import { Product } from '../../products/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;
  cartObj = [];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    //console.log("Inside init service");

    // this.shopService.getMsg().subscribe((product: any) => {
    //   console.log("i am in cart component ");
    //   console.log(product);
    //   //this.addProductToCart(product);
    //   //console.log("i am in cart component ");
    // });

    // console.log(JSON.parse(localStorage.getItem("cartItems")));
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    console.log(this.cartObj.length);
    this.cartTotal = 0;
    this.cartObj.forEach((item) => {
      this.cartTotal += item.qty * item.price;
    });
    console.log('total ', this.cartTotal);
    console.log('local storage', this.cartObj);

    //console.log("length ", this.cartItems.length);
    // if(this.cartObj != null){
    //   this.cartTotal = 0;
    //   this.cartObj.forEach((item) => {
    //     this.cartTotal += item.qty * item.price;
    //   });
    //   console.log(this.cartTotal);
    // }
  }

  addProductToCart(product: any) {
    let productExists = false;
    console.log('hereeeeee');

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;
        this.cartItems[i].price += this.cartItems[i].price;
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
      });
    }

    //localStorage.setItem("cartItems", JSON.stringify(this.cartItems));

    console.log(this.cartItems);
    this.cartTotal = 0;
    this.cartItems.forEach((item) => {
      this.cartTotal += item.quantity * item.price;
    });
  }

  createOrder() {
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    this.shopService.addOrders(this.cartObj);
  }
}