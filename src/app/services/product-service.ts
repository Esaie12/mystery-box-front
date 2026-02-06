
//Version locale : utiliser l'URL directe de ton serveur local
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  private baseUrl = 'http://127.0.0.1:8000/api/admin/products';
 //private baseUrl = `${environment.apiUrl}/admin/products`; // <-- utiliser environment en production
  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(this.baseUrl)
      .pipe(map(resp => resp.products));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
