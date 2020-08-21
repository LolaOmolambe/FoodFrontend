import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit, OnDestroy {
  private orderId: string;
  private authStatusSub: Subscription;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private ordersSub: Subscription;
  userIsAdmin: string;

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
        //console.log(this.userIsAdmin);
      });
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('orderId')) {
        //this.mode = 'edit';
        this.orderId = paramMap.get('orderId');
        this.isLoading = true;
        this.shopService
          .updateProduct(this.orderId, "Paid");

      } else {
        // this.mode = 'create';
        // this.productId = null;
      }
    });
  }

  ngOnDestroy(): void {
    //this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
