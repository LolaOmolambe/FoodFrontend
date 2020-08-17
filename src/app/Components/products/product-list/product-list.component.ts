import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any[] = [];

  isLoading = false;
  totalProducts = 0;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;

  constructor(
    public productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.productsSub = this.productsService
      .getProductsUpdateListener()
      .subscribe((productData: { products: any[]; productCount: number }) => {
        // .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
        console.log(this.products);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
        console.log(this.userIsAdmin);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.postsPerPage, this.currentPage);
  }

}
