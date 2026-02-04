import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true
})
export class Login {

  data ={
    userEmail:"",
    userPassword:"",
    userSouvenir:false
  }

  isLoading = false;

   
  constructor(private loginService: AuthService , private router: Router ) {}

  seConnecter() {

    this.isLoading = true;

    this.loginService.login({
      email: this.data.userEmail,
      password: this.data.userPassword
    }).pipe(
      finalize(() => {
        this.isLoading = false; // Toujours reset
      })
    ).subscribe({
      next: (res) => {
       // console.log('Connecté !', res);
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Erreur connexion', err);
        // Ici plus besoin de reset isLoading
      }
    });
  }

}
