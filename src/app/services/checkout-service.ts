import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminOrder, AdminOrdersListResponse, Order, OrdersStatsResponse, OrderTracking } from '../models/orders.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private http = inject(HttpClient);

  //private API_URL = 'http://localhost:8000/api/orders';
  //private API_URL_ADMIN = 'http://localhost:8000/api/admin';

  private API_URL = environment.apiUrl;
  private API_URL_ADMIN =environment.apiUrl+'/admin';
  

  createOrder(payload: any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.API_URL+'/orders', payload, { headers });
  }

  trackOrder(orderNumber: string): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(`${this.API_URL}/orders/${orderNumber}`);
  }


  userGetOrdersSummary(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.API_URL}/orders-users/summary`, { headers });
  }

  
  getMyOrders(token: string): Observable<Order[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Order[]>(`${this.API_URL}/orders-users/my`, { headers });
  }

  //Retourner pour l'admin les stats de commandes
  adminGetOrdersStats(): Observable<OrdersStatsResponse> {
    return this.http.get<OrdersStatsResponse>(`${this.API_URL_ADMIN}/orders-stats`);
  }

  adminGetOrders(): Observable<AdminOrdersListResponse> {
    return this.http.get<AdminOrdersListResponse>(`${this.API_URL_ADMIN}/orders`);
  }

  adminGetOrderByReference(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL_ADMIN}/orders/${orderNumber}`);
  }

  
}
