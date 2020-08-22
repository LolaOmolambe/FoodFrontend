import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/admin/';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private reportsUpdated = new Subject<{
    productCount: number;
    userCount: number;
    orderCount: number;
    totalSales: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getReportsUpdateListener() {
    return this.reportsUpdated.asObservable();
  }

  getReports() {
    this.http
      .get<{
        message: string;
        userCount: number;
        orderCount: number;
        productCount: number;
        totalSales: number;
      }>(BACKEND_URL + 'adminreport')
      .pipe(
        map((reportData) => {
          return {
            userCount: reportData.userCount,
            orderCount: reportData.orderCount,
            productCount: reportData.productCount,
            totalSales: reportData.totalSales
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.reportsUpdated.next({
          productCount: transformedPostData.productCount,
          userCount: transformedPostData.userCount,
          orderCount: transformedPostData.orderCount,
          totalSales: transformedPostData.totalSales
        });
      });
  }

}
