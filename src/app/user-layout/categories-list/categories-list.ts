import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/categories.model';
import { CategoryService } from '../../services/category-service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.css']
})
export class CategoriesList {
  
  categoryService = inject(CategoryService);

  // Observable de catégories
  categories$: Observable<Category[]> = this.categoryService.getCategories();

  // Stocke la catégorie choisie
  selectedCategory?: Category;

  constructor() {}

  // Récupérer une catégorie par id
  getCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.selectedCategory = category;
        console.log(category);
      },
      error: (err) => console.error(err)
    });
  }
}
