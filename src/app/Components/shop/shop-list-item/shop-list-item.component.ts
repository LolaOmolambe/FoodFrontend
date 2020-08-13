import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../products/product.model';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-shop-list-item',
  templateUrl: './shop-list-item.component.html',
  styleUrls: ['./shop-list-item.component.css']
})
export class ShopListItemComponent implements OnInit {

 @Input() productItem: any;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
  }

  handleAddToCart() {
    this.shopService.sendMsg(this.productItem);
  }

}
