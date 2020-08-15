import { Component, OnInit, Input } from '@angular/core';
import {ShopService} from '../shop/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {

  @Input() productItem: any;

  constructor(private shopService: ShopService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openSnackBar() {
    this.snackBar.open('Item added to cart','', {
      duration: 3000
    });
  }

  handleAddToCart() {
    this.shopService.sendMsg(this.productItem);
    this.openSnackBar();
  }
}
