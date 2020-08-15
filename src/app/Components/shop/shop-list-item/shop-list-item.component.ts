import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../products/product.model';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-list-item',
  templateUrl: './shop-list-item.component.html',
  styleUrls: ['./shop-list-item.component.css'],
})
export class ShopListItemComponent implements OnInit {
  @Input() productItem: any;

  constructor(private shopService: ShopService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackBar() {
    //console.log("snackbar");
    this.snackBar.open('Item added to cart','', {
      duration: 3000
    });
  }

  handleAddToCart() {
    this.shopService.sendMsg(this.productItem);
    this.openSnackBar();
    // var x = document.getElementById('snackbar');
    // console.log('modal');
    // x.className = 'show';
    // x.className = x.className.replace('show', '');
    // setTimeout(function () {
    //   x.className = x.className.replace('show', '');
    // }, 3000);
  }
}
