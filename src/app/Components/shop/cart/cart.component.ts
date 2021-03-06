import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from '../shop.service';
import { AuthService } from 'src/app/Components/auth/auth.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems = [];
  cartTotal = 0;
  cartObj = [];
  isLoading = false;
  userId: string;
  userIsAdmin: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  count = 0;
  deliveryCost = 30

  simpleObservable = new Subject();
  simpleObservables = this.simpleObservable.asObservable();

  constructor(
    private shopService: ShopService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
    if (this.cartObj != null) {
      this.cartTotal = 0;
      this.cartTotal += this.deliveryCost;
      this.cartObj.forEach((item) => {
        this.cartTotal += item.qty * item.price;
      });
    }

    //this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
        this.cartObj = JSON.parse(localStorage.getItem('cartItems'));
      });
  }

  openSnackBar() {
    this.snackBar.open('Item removed from cart', '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'notif-success',
    });
  }

  removeProductFromCart(product_id: any) {
    for (let i in this.cartObj) {
      if (this.cartObj[i].productId === product_id) {
        let index = this.cartObj.indexOf(this.cartObj[i]);
        if (index > -1) {
          this.cartObj.splice(index, 1);
          this.openSnackBar();
        }
        break;
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartObj));

    this.cartTotal = 0;
    this.cartTotal += this.deliveryCost;
    this.cartObj.forEach((item) => {
      this.cartTotal += item.qty * item.price;
    });

    if (this.cartObj != null) {
      this.shopService.removeOrder(this.cartObj);
    }
  }

  proceedToCheckout() {
    if (this.userIsAuthenticated === false) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['checkout']);
    }
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
