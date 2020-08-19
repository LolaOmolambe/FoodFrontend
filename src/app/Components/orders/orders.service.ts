import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/order/';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  //private products: Product[] = [];
  private orders: [];
  private ordersUpdated = new Subject<{
    //products: Product[];
    orders: [];
    orderCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrders(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; orders: any; maxOrders: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((orderData) => {
          return {
            orders: orderData.orders.map((order) => {
              return {
                id: order._id,
                firstName: order.customer.firstName,
                lastName: order.customer.lastName,
                email: order.customer.email,
                grandTotal: order.grandTotal,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
              };
            }),
            maxOrders: orderData.maxOrders,
          };
        })
      )
      .subscribe((transformedOrderData) => {
        this.orders = transformedOrderData.orders;
        this.ordersUpdated.next({
          orders: [...this.orders],
          orderCount: transformedOrderData.maxOrders,
        });
      });
  }

  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }
  getPersonalOrders(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; orders: any; maxOrders: number }>(
        BACKEND_URL+ "myOrders" + queryParams
      )
      .pipe(
        map((orderData) => {
          console.log(orderData);
          return {
            orders: orderData.orders.map((order) => {
              return {
                name: order.product_id.name,
                image: order.product_id.imagePath,
                genre: order.product_id.genre,
                price: order.product_price,
                quantity: order.product_quantity,
                status: order.order_id.status,
                createdAt: order.order_id.createdAt,
                updatedAt: order.order_id.updatedAt,
              };
            }),
            maxOrders: orderData.maxOrders,
          };
        })
      )
      .subscribe((transformedOrderData) => {
        this.orders = transformedOrderData.orders;
        this.ordersUpdated.next({
          orders: [...this.orders],
          orderCount: transformedOrderData.maxOrders,
        });
      });
  }

  getOrder(orderId: string) {
    return this.http.get<{
      _id: string;
      grandTotal: number;
      status: string;

    }>(BACKEND_URL + orderId);
  }

  updateOrder(orderId: string, status: string) {
    let statusData = {
      status: status,
    };

    console.log(statusData);

    this.http
      .put<{ status: string; message: string }>(BACKEND_URL + orderId, statusData)
      .subscribe((response) => {
        if (response.status == 'success') {
          this.router.navigate(['/orderlist']);
        }
        //this.router.navigate(['/']);
      });
  }
}
