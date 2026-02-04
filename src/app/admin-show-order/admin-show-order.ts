import { Component, inject } from '@angular/core';
import { CheckoutService } from '../services/checkout-service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AdminOrder, Order } from '../models/orders.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-show-order',
  imports: [CommonModule],
  templateUrl: './admin-show-order.html',
  styleUrl: './admin-show-order.css',
})
export class AdminShowOrder {

  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(CheckoutService);

  order$!: Observable<Order>;


  orderId = String(this.route.snapshot.paramMap.get('id'));

  constructor() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.orderId = id;
    
    this.order$ = this.orderService.adminGetOrderByReference(id).pipe(
      catchError(() => {
        //this.router.navigate(['/admin/']);
        return EMPTY;
      })
    );
  }

}
