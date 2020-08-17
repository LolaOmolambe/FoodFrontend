import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  products: any[] = [];

  isLoading = false;
  totalProducts = 0;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  //private authStatusSub: Subscription;
  userIsAdmin: string;
  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.postsPerPage, this.currentPage);
    //this.userId = this.authService.getUserId();
    //this.userIsAdmin = this.authService.getRole();
    this.productsSub = this.productsService
      .getProductsUpdateListener()
      .subscribe((productData: { products: any[]; productCount: number }) => {
        // .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
        console.log(this.products);
      });
  }


}
