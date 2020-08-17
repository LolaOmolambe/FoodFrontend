import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {OrdersService} from '../orders.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders = [];
  isLoading = false;
  totalOrders = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;

  constructor(public orderService: OrdersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.orderService.getPersonalOrders(this.postsPerPage, this.currentPage);
    //this.userId = this.authService.getUserId();
    //this.userIsAdmin = this.authService.getRole();
    this.ordersSub = this.orderService
      .getOrderUpdateListener()
      .subscribe((ordersData: { orders: any[]; orderCount: number }) => {
        // .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.orders = ordersData.orders;
        this.totalOrders = ordersData.orderCount;
        console.log(this.totalOrders);
      });
    //this.userIsAuthenticated = this.authService.getIsAuth();
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
    this.orderService.getPersonalOrders(this.postsPerPage, this.currentPage);
  }

}
