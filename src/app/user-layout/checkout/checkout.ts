import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/categories.model';
import { ActivatedRoute, Router} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout-service';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

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
  private toastr = inject(ToastrService);
  private token = "";

  category$!: Observable<Category>;
  error?: string;
  categoryData!: Category;

  private fb = inject(FormBuilder);

  categoryId = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {

    // ✅ Vérifier si l'utilisateur est connecté dès le départ
    const token = this.authService.getToken();
    if (!token) {
      console.warn('Utilisateur non connecté, redirection vers login');
      this.toastr.error('Utilisateur non connecté, redirection vers login', 'Erreur');
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

      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          console.error(`⚠️ Erreurs sur ${key}:`, control.errors);
        }
      });

      return;
    }

    // Formulaire valide ✅ → lancer le paiement
    this.openPaymentWidget();
  }

  private openPaymentWidget() {
    if (!this.categoryData) {
      console.error("❌ Catégorie non chargée");
      return;
    }

    const price = Number(this.categoryData.price);
    if (isNaN(price) || price <= 0) {
      console.error("❌ Prix invalide pour la catégorie");
      return;
    }

    openKkiapayWidget({
      amount: price,
      api_key: "13ad8b50029111f190dfcbb2012fee53",
      sandbox: true
    });
  }

  // Étape 3 : après paiement réussi, créer la commande
  private onPaymentSuccess() {
    console.log("✅ Paiement réussi");

    const token = this.authService.getToken();
    if (!token) {
      this.error = 'Vous devez être connecté';
      return;
    }

    const payload = {
      category_id: this.categoryId,
      ...this.form.value
    };

    this.checkoutService.createOrder(payload, token).subscribe({
      next: (res) => {
        console.log('✅ Commande créée', res);
        this.toastr.success('Commande effectuée avec succès !');
        this.router.navigate(['/my-orders']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la création de la commande', err);
        this.toastr.error('Erreur lors de la création de la commande');
      }
    });
  }
  

  title = 'kkiapay-sample-project';

  open() {

    if (!this.categoryData) {
      console.error("❌ Catégorie non chargée");
      return;
    }


     const price = Number(this.categoryData.price);
    if (isNaN(price) || price <= 0) {
      console.error("❌ Prix invalide pour la catégorie");
      return;
    }

    openKkiapayWidget({
      amount: price,
      api_key: "13ad8b50029111f190dfcbb2012fee53",
      sandbox: true,
    })
  }  

  successHandler() {
    console.log("payment success...");
  }

  ngOnInit() {

    this.category$.subscribe({
      next: (cat) => {
        this.categoryData = cat;
      },
      error: (err) => {
        console.error("Impossible de récupérer la catégorie", err);
      }
    });

    //addKkiapayListener('success',this.successHandler)
    addKkiapayListener('success', () => this.onPaymentSuccess());
  }

}
