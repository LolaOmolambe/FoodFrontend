import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  userIsAdmin: string;
  cartItem = [];
  cartItems = 0;
  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getRole();
    console.log("role ", this.userIsAdmin);
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated,
      this.userIsAdmin = this.authService.getRole();
      console.log("roless ", this.userIsAdmin);
    });
    this.cartItem = JSON.parse(localStorage.getItem("cartItems"));
    if(this.cartItem != null){
      this.cartItems = this.cartItem.length;
    }
    console.log(this.cartItems);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
