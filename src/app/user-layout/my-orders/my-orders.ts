import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Order } from '../../models/orders.model';
import { CheckoutService } from '../../services/checkout-service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {

  private orderService = inject(CheckoutService);
  private authService = inject(AuthService);

  orders$!: Observable<Order[]>;
  error?: string;

  expandedOrders: Set<string> = new Set();

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const token = this.authService.getToken();

    if (!token) {
      this.error = 'Vous devez être connecté';
      return;
    }
    console.log(token);

    this.orders$ = this.orderService.getMyOrders(token).pipe(
      tap((res: any) => console.log(res.orders)),
      map((res: any) => res.orders),
      catchError(err => {
        this.error = 'Impossible de récupérer vos commandes';
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  toggleOrder(orderId: string) {
    if (this.expandedOrders.has(orderId)) {
      this.expandedOrders.delete(orderId);
    } else {
      this.expandedOrders.add(orderId);
    }
  }

  isExpanded(orderId: string) {
    return this.expandedOrders.has(orderId);
  }

}
