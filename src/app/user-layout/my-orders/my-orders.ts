import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Order } from '../../models/orders.model';
import { CheckoutService } from '../../services/checkout-service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-my-orders',
  imports: [CommonModule,RouterLink,CurrencyPipe,DatePipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {

  private orderService = inject(CheckoutService);
  private authService = inject(AuthService);

  orders$!: Observable<Order[]>;
  error?: string;
  user? = this.authService.getUser();

  expandedOrders: Set<string> = new Set();

  // Stats utilisateur
    totalOrders = 0;
    totalAmount = 0;
    inProgress = 0;

  ngOnInit() {
    this.fetchOrders();
    this.fetchUserSummary();
  }


  fetchUserSummary() {
    const token = this.authService.getToken();

    if (!token) {
      this.error = 'Vous devez être connecté';
      return;
    }

    this.orderService.userGetOrdersSummary(token).subscribe({
      next: (res) => {
        this.totalOrders = res.total_orders;
        this.totalAmount = res.total_amount;
        this.inProgress = res.in_progress;
        console.log('Stats utilisateur:', res);
      },
      error: (err) => {
        console.error('Erreur stats utilisateur:', err);
        this.error = 'Impossible de récupérer les statistiques';
      }
    });
  }


  fetchOrders() {
    const token = this.authService.getToken();

    if (!token) {
      this.error = 'Vous devez être connecté';
      return;
    }

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