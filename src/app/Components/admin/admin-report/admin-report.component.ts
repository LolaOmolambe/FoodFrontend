import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import {AuthService} from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit, OnDestroy {

  isLoading = false;
  totalProducts = 0;
  totalOrders = 0;
  totalUsers = 0;
  totalSales = 0;
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;

  constructor(public adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.adminService.getReports();
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.productsSub = this.adminService
      .getReportsUpdateListener()
      .subscribe((productData: {productCount: number; userCount: number;
        orderCount: number; totalSales: number}) => {
        this.isLoading = false;
        this.totalProducts = productData.productCount;
        this.totalOrders = productData.orderCount;
        this.totalUsers = productData.userCount;
        this.totalSales = productData.totalSales;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
      });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
