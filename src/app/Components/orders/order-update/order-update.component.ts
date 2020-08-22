import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdersService } from '../orders.service';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css'],
})
export class OrderUpdateComponent implements OnInit, OnDestroy {
  order;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  Status: any = ['Paid', 'Cancelled', 'Processing', 'Completed'];
  public mode = 'create';
  private orderId: string;
  private authStatusSub: Subscription;
  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrdersService,
    private shopservice: ShopService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      status: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('orderId')) {
        this.mode = 'edit';
        this.orderId = paramMap.get('orderId');
        this.isLoading = true;
        this.orderService.getOrder(this.orderId).subscribe((orderData) => {
          this.isLoading = false;
          this.order = {
            id: orderData._id,
            status: orderData.status,
          };

          this.form.setValue({
            status: this.order.status,
          });
        });
      } else {
        this.mode = 'create';
        //this.productId = null;
      }
    });
  }

  onUpdateOrder() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.orderService.updateOrder(this.orderId, this.form.value.status);

    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  // Choose city using select dropdown
  changeStatus(e) {
    this.form.value.status.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
