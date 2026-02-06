import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/product-service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-admin-product-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-product-show.html',
})
export class AdminProductShow {

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  product$: Observable<Product> = this.productsService.getProduct(
    Number(this.route.snapshot.paramMap.get('id'))
  );
}
