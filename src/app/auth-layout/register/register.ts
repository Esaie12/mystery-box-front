import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth-service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
   
  private toastr = inject(ToastrService);
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

  private getFieldLabel(controlName: string): string {
    const labels: Record<string, string> = {
      nameCtrl: 'Nom',
      emailCtrl: 'Email',
      phoneCtrl: 'Téléphone',
      passwordCtrl: 'Mot de passe',
      confirmpasswordCtrl: 'Confirmation du mot de passe',
      acceptCtrl: 'Conditions générales'
    };

    return labels[controlName] || controlName;
  }


  sendInformation() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      const invalidFields: string[] = [];

      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          invalidFields.push(this.getFieldLabel(key));
        }
      });

      const message = `Champs invalides : ${invalidFields.join(', ')}`;

      console.warn('❌ Formulaire invalide', invalidFields, this.form.errors);
      this.toastr.error(message, 'Formulaire invalide');

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
        console.log('✅ Inscription réussie !'); //, res
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’inscription', err);
        // Gestion des erreurs de validation venant du backend
        if (err.error?.errors) {
          Object.keys(err.error.errors).forEach(field => {
            const message = err.error.errors[field][0];

            console.error(`⛔ ${field}: ${message}`);

            // Toast par champ
            this.toastr.error(message, 'Erreur de validation');

            // Liaison avec le form control
            const control = this.form.get(field + 'Ctrl');
            if (control) {
              control.setErrors({ backend: message });
            }
          });
        }
      }
    });
  }

}
