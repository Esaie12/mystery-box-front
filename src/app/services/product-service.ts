// src/app/services/product-service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- importer l'env

export interface Product {
  id: number;
  name: string;
  compatible?: string;
  category?: {
    title: string;
    subtitle?: string;
  };
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
 // private baseUrl = 'http://localhost:8000/api/admin/products';
  private baseUrl = `${environment.apiUrl}/admin/products`; // <-- utiliser environment en production

  // Récupérer tous les produits
  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.baseUrl)
      .pipe(map(resp => resp.products));
  }

  // Créer un produit
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Mettre à jour un produit
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // Supprimer un produit
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
