import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from '../orders.service';
import {AuthService} from '../../auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders = [];
  isLoading = false;
  totalOrders = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;

  constructor(public orderService: OrdersService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
        console.log(this.userIsAdmin);
      });
    this.orderService.getOrders(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.ordersSub = this.orderService
      .getOrderUpdateListener()
      .subscribe((ordersData: { orders: any[]; orderCount: number }) => {
        this.isLoading = false;
        this.orders = ordersData.orders;
        this.totalOrders = ordersData.orderCount;
        console.log(this.totalOrders);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((isAuthenticated) => {
    //     this.userIsAuthenticated = isAuthenticated;
    //     this.userId = this.authService.getUserId();
    //     this.userIsAdmin = this.authService.getRole();
    //     console.log(this.userIsAdmin);
    //   });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.orderService.getOrders(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
