import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { OrderTracking } from '../../models/orders.model';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  imports: [CommonModule,FormsModule],
  templateUrl: './tracking.html',
  styleUrl: './tracking.css',
  standalone:true
})
export class Tracking {

  checkoutService = inject(CheckoutService);
  
  orderNumber: string = '';
  order$!: Observable<OrderTracking | null>;
  errorMessage: string = '';

  searchOrder() {
    if (!this.orderNumber.trim()) {
      this.errorMessage = 'Veuillez entrer un numéro de commande.';
      this.order$ = of(null);
      return;
    }

    this.errorMessage = '';
    this.order$ = this.checkoutService.trackOrder(this.orderNumber).pipe(
      catchError(err => {
        console.error(err);
        this.errorMessage = 'Commande introuvable ou erreur serveur.';
        return of(null);
      })
    );
  }
}
