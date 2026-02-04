import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth-service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
   
  constructor(private authService: AuthService ) {}
  
  private fb = inject(FormBuilder);
  private router = inject(Router);

  
  isLoading = false; // propriété pour gérer le loading


  form = this.fb.group({
    nameCtrl: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    emailCtrl: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneCtrl: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\+?[0-9\s]{8,15}$/)
      ]
    ],

    passwordCtrl: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],

    confirmpasswordCtrl: [
      '',
      Validators.required
    ],

    acceptCtrl: [
      false,
      Validators.requiredTrue
    ]
  }, {
    validators: this.passwordMatchValidator
  });

  // 🔒 Vérification mot de passe
  private passwordMatchValidator(group: any) {
    const password = group.get('passwordCtrl')?.value;
    const confirm = group.get('confirmpasswordCtrl')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  sendInformation() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('❌ Formulaire invalide', this.form.errors, this.form.value);
      return;
    }

    const payload: RegisterData = {
      name: this.form.value.nameCtrl!,
      email: this.form.value.emailCtrl!,
      phone: this.form.value.phoneCtrl!,
      password: this.form.value.passwordCtrl!,
      password_confirmation: this.form.value.confirmpasswordCtrl!,
      accept_terms: this.form.value.acceptCtrl ?? false
    };

    this.isLoading = true; // 🔒 Bloque le bouton dès le départ

    this.authService.register(payload).pipe(
      finalize(() => {
        this.isLoading = false; // ⬅ Toujours reset après succès ou erreur
      })
    ).subscribe({
      next: (res) => {
        console.log('✅ Inscription réussie !', res);
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’inscription', err);
        // Gestion des erreurs de validation venant du backend
        if (err.error?.errors) {
          Object.keys(err.error.errors).forEach(field => {
            const control = this.form.get(field + 'Ctrl');
            if (control) {
              control.setErrors({ backend: err.error.errors[field][0] });
            }
          });
        }
      }
    });
  }

}
