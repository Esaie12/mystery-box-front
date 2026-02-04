import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { map, Observable } from 'rxjs';
import { AdminOrder, OrdersStatsResponse } from '../../models/orders.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, CurrencyPipe,RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: '../header-admin/header-admin.css',
})
export class AdminDashboard {
   

  adminService = inject(CheckoutService);

  stats$!: Observable<OrdersStatsResponse>;
  orders$!: Observable<AdminOrder[]>;

  ngOnInit() {
    this.stats$ = this.adminService.adminGetOrdersStats();

    this.orders$ = this.adminService.adminGetOrders().pipe(
      map(res => res.orders) 
    );
  }

  viewOrder(idOrder:number){}

  editOrder(idOrder:number){}

  deleteOrder(idOrder:number){}


  
}
