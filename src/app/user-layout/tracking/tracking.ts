import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { OrderTracking } from '../../models/orders.model';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tracking',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './tracking.html',
  styleUrls: ['./tracking.css'],
  standalone: true
})
export class Tracking {

  checkoutService = inject(CheckoutService);

  orderNumber: string = '';
  order$!: Observable<OrderTracking | null>;

  errorMessage = '';
  isLoading = false;
  hasSearched = false;

  searchOrder() {
    if (!this.orderNumber.trim()) {
      this.errorMessage = 'Veuillez entrer un numéro de commande.';
      this.order$ = of(null); // Reset le résultat si champ vide
      this.hasSearched = false;
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;
    this.hasSearched = true;

    this.order$ = this.checkoutService.trackOrder(this.orderNumber).pipe(
      map(res => res ?? null),
      catchError(err => {
        console.error(err);
        this.errorMessage = 'Commande introuvable.';
        return of(null);
      })
    );

    this.order$.subscribe(result => {
      console.log('Résultat:', result);
      this.isLoading = false;
    });
  }

  // dans le composant
  isEmpty(obj: any): boolean {
      return obj == null || (Object.keys(obj).length === 0 && obj.constructor === Object);
  }

}
