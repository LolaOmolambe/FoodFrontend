import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ShopService } from '../shop/shop.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  userIsAdmin: string;

  cartcount;
  constructor(
    private authService: AuthService,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    // $('.navbar-collapse a').click(function(){
    //   console.log("navbar");
    //   $(".navbar-collapse").collapse('hide');
    // });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getRole();
    console.log('role ', this.userIsAdmin);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        console.log('isauth', isAuthenticated);
        (this.userIsAuthenticated = isAuthenticated),
          (this.userIsAdmin = this.authService.getRole());

        console.log('roless ', this.userIsAdmin, this.userIsAuthenticated);
      });
    this.shopService.getCountOfCart().subscribe((count) => {
      this.cartcount = count;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
