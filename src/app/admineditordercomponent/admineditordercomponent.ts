import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AdminOrder } from '../models/orders.model';
import { CheckoutService } from '../services/checkout-service';


@Component({
  selector: 'app-admin-edit-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admineditorcomponent.html',
  styleUrls: ['./admineditorcomponent.css']
})
export class AdminEditOrderComponent implements OnInit {
  @Input() order!: AdminOrder;
  @Output() saved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  form!: FormGroup;
  private adminService = inject(CheckoutService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      recipient_name: [this.order.recipient_name, Validators.required],
      phone: [this.order.phone, Validators.required],
      category: [this.order.category?.id, Validators.required],
      status: [this.order.status?.id, Validators.required],
      amount: [this.order.amount, [Validators.required, Validators.min(0)]],
    });
  }

  save() {
    if (this.form.invalid) return;
    this.adminService.updateOrder(this.order.id, this.form.value).subscribe({
      next: (): void => this.saved.emit(),
      error: (err: Error): void => console.error(err)
    });
  }

  cancel() {
    this.canceled.emit();
  }
}
