import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
export class ShopListComponent implements OnInit, OnDestroy {
  products: any[] = [];
  tab: any = 'tab1';
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

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.postsPerPage, this.currentPage);
  }

  getProductsByCategory(category: string, check: any) {
    this.isLoading = true;
    this.onClick(check);
    this.productsService.getProductsByParams(
      this.postsPerPage,
      this.currentPage,
      category
    );
  }

  onClick(check) {
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    } else if (check == 3) {
      this.tab = 'tab3';
    } else if (check == 4) {
      this.tab = 'tab4';
    } else {
      this.tab = 'tab5';
    }
  }
}
