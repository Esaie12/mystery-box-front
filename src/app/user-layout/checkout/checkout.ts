import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/categories.model';
import { ActivatedRoute, Router} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  route = inject(ActivatedRoute);
  router = inject(Router);
  categoryService = inject(CategoryService);
  checkoutService = inject(CheckoutService);
  private authService = inject(AuthService);

  private token = "";

  category$!: Observable<Category>;
  error?: string;

  private fb = inject(FormBuilder);

  categoryId = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {

    // ✅ Vérifier si l'utilisateur est connecté dès le départ
    const token = this.authService.getToken();
    if (!token) {
      console.warn('Utilisateur non connecté, redirection vers login');
      this.router.navigate(['/login']);
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryId = id;
    
    this.category$ = this.categoryService.getCategoryById(id).pipe(
      catchError(() => {
        this.router.navigate(['/categories']);
        return EMPTY;
      })
    );

  }

  //Recuperer les entrées
  form = this.fb.group({
     /* usernameCtrl : ['', Validators.required],
      emailCtrl : ['', [Validators.required, Validators.email]],
      subjectCtrl : ['', Validators.required],
      messageCtrl : ['', [Validators.required, Validators.minLength(1)]]*/

      recipientName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
        ]
      ],

      recipientSexe: ['', Validators.required],

      message: ['', Validators.maxLength(200)],

      anonymous: [false],

      recipientTel: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9\s]{8,15}$/)
        ]
      ],

      recipientAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ]
      ],

      dateDelivery: ['', Validators.required],

      instructionDelivery: ['', Validators.maxLength(255)]

  });
  

  submitOrder() {
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('❌ Formulaire invalide');

      // 🔹 Parcourir chaque contrôle et afficher les erreurs
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          console.error(`⚠️ Erreurs sur ${key}:`, control.errors);
        }
      });
    
      return;
    }

    // ✅ Données complètes à envoyer à l’API
    const payload = {
      category_id: this.categoryId,
      ...this.form.value
    };

    // 🔥 1️⃣ Afficher en console
    //console.log('📦 Données envoyées :', payload);

    const token = this.authService.getToken();

    if (!token) {
      this.error = 'Vous devez être connecté';
      return;
    }

    this.checkoutService.createOrder(payload,token).subscribe({
      next: (res) => {
        console.log('✅ Commande créée', res);
        this.router.navigate(['/my-orders']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la commande', err);
      }
    });

  }

}
