import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductsService } from '../services/product-service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$!: Observable<Product[]>;
  private productsService = inject(ProductsService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.getProducts();
  }

  editProduct(id: number) {
    console.log('Edit product', id);
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error(err)
    });
  }
}
