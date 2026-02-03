import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderTracking } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:8000/api/orders';

  createOrder(payload: any): Observable<any> {
    return this.http.post(this.API_URL, payload);
  }

  trackOrder(orderNumber: string): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(`${this.API_URL}/${orderNumber}`);
  }

  
  getMyOrders(token: string): Observable<Order[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Order[]>(`${this.API_URL}-users/my`, { headers });
  }
  
}
