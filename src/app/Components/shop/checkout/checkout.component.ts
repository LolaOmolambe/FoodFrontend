import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal = 0;
  isLoading = false;
  cartObj = [];
  userIsAuthenticated = false;
  userId: string;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;
  constructor(
    public shopService: ShopService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    if (this.cartObj != null) {
      this.cartTotal = 0;
      this.cartObj.forEach((item) => {
        this.cartTotal += item.qty * item.price;
      });
      this.isLoading = true;
      this.userId = this.authService.getUserId();
      this.userIsAdmin = this.authService.getRole();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe((isAuthenticated) => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
          this.userIsAdmin = this.authService.getRole();
          //console.log(this.userIsAdmin);
        });
    }
  }

  createOrder() {
    this.isLoading = true;
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    this.shopService.addOrders(this.cartObj, this.cartTotal);
  }
}
