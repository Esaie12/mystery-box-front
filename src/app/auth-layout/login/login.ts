import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true
})
export class Login {

  private toastr = inject(ToastrService);
  data ={
    userEmail:"",
    userPassword:"",
    userSouvenir:false
  }

  isLoading = false;

   
  constructor(private loginService: AuthService , private router: Router ) {}

  seConnecter() {

  if (!this.data.userEmail || !this.data.userPassword) {
    this.toastr.error(
      'Veuillez saisir votre email et votre mot de passe',
      'Champs obligatoires'
    );
    return;
  }

  this.isLoading = true;

  this.loginService.login({
    email: this.data.userEmail,
    password: this.data.userPassword
  }).pipe(
    finalize(() => {
      this.isLoading = false;
    })
  ).subscribe({
    next: () => {
      this.router.navigate(['/categories']);
    },
    error: (err) => {
      console.error('Erreur connexion', err);
    }
  });
}


}
