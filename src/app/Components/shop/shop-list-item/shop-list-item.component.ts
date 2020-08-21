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
    this.snackBar.open('Item added to cart','', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'notif-success'
    });
  }


  handleAddToCart() {
    this.shopService.sendMsg(this.productItem);
    this.openSnackBar();

  }
}
