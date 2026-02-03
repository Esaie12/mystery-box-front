import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
   
  constructor(private authService: AuthService ) {}
  
  private fb = inject(FormBuilder);
  private router = inject(Router);

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
    // 1️⃣ Vérification du formulaire
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('❌ Formulaire invalide', this.form.errors, this.form.value);
      return;
    }

    // 2️⃣ Construction du payload à envoyer à l’API
    const payload: RegisterData = {
      name: this.form.value.nameCtrl!, // le ! dit "je garantis que ce n'est pas null/undefined"
      email: this.form.value.emailCtrl!,
      phone: this.form.value.phoneCtrl!,
      password: this.form.value.passwordCtrl!,
      password_confirmation: this.form.value.confirmpasswordCtrl!,
      accept_terms: this.form.value.acceptCtrl ?? false      // si null/undefined, on met false
    };

    console.log('📩 Envoi des données :', payload);

    // 3️⃣ Appel API via AuthService
    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('✅ Inscription réussie !', res);
        // 4️⃣ Redirection après inscription
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’inscription', err);
        // 5️⃣ Afficher message d’erreur côté UI
        // par ex. err.error.message ou err.error.errors
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
