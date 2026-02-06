/* import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';
import { ProductsService } from '../../services/product-service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-product.html',
  animations: [
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class AdminEditProduct implements OnChanges {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);

  @Input() product!: Product;
  @Input() categories: { id: number; title: string }[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();

  successMessage = '';

  // Formulaire avec validation
  editForm = this.fb.group({
    id: [null, Validators.required],            // number
    name: ['', Validators.required],                // string
    category_id: [null, Validators.required],  // number
    icon: ['']                                      // string
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.editForm.patchValue({
        id: this.product.id ?? undefined,
        name: this.product.name ?? '',
        category_id: this.product.category?.id ?? undefined,
        icon: this.product.icon ?? ''
      });
      this.successMessage = '';
    }
  }

  submitEdit() {
    if (!this.product || this.editForm.invalid) return;

    const formValue = this.editForm.value;

    // Forcer les types corrects
    const productId: number = Number(formValue.id);
    const categoryId: number = formValue.category_id ? Number(formValue.category_id) : undefined;
    const name: string = formValue.name ?? '';
    const icon: string = formValue.icon ?? '';

    this.productsService.updateProduct(productId, {
      name,
      category: categoryId ? { id: categoryId, title: '' } : undefined,
      icon
    }).subscribe({
      next: () => {
        this.successMessage = 'Le produit a été modifié avec succès !';
        this.productUpdated.emit();
        setTimeout(() => this.closeModal.emit(), 2000);
      },
      error: err => console.error(err)
    });
  }

  cancel() {
    this.closeModal.emit();
  }
}
 */
