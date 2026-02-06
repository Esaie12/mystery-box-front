import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- nécessaire pour async et *ngIf
import { RouterModule } from '@angular/router'; // <-- si tu utilises routerLink dans le template
import { Observable } from 'rxjs';
import { Product, ProductsService } from '../services/product-service';

@Component({
  selector: 'app-admin-products',
  standalone: true,            // <-- si tu utilises le composant standalone
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$!: Observable<Product[]>;
  private productsService = inject(ProductsService);

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.getProducts();
  }

  editProduct(id: number) {
    console.log('Edit product', id);
    // tu peux router vers /admin/products/edit/:id ici si besoin
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: (): void => this.loadProducts(),
      error: (err: unknown): void => console.error(err)
    });
  }
}
