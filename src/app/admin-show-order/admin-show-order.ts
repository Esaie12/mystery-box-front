import { Component, inject } from '@angular/core';
import { CheckoutService } from '../services/checkout-service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { AdminOrder, Order } from '../models/orders.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-show-order',
  imports: [CommonModule],
  templateUrl: './admin-show-order.html',
  styleUrls: ['./admin-show-order.css'],
})
export class AdminShowOrder {

  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(CheckoutService);

  // On utilise AdminOrder pour correspondre au backend admin
  order$!: Observable<AdminOrder>;

  orderId = String(this.route.snapshot.paramMap.get('id'));

  constructor() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.orderId = id;

    this.order$ = this.orderService.adminGetOrderByReference(id).pipe(
      catchError(() => {
        // Rediriger ou gérer l'erreur
        return EMPTY;
      })
    );
  }
}
