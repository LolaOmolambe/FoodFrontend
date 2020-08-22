import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../Components/products/products.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[] = [];

  isLoading = false;
  totalProducts = 0;
  postsPerPage = 8;
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
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.productsSub = this.productsService
      .getProductsUpdateListener()
      .subscribe((productData: { products: any[]; productCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
