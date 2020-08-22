import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {ShopService} from '../shop/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit, OnDestroy {

  @Input() productItem: any;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private shopService: ShopService,
    private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
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
  ngOnDestroy() {
    //this.productsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}
