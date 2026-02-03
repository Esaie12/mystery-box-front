import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
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

   
  constructor(private loginService: AuthService , private router: Router ) {}

  seConnecter() {
    this.loginService.login({
      email: this.data.userEmail,
      password: this.data.userPassword
    }).subscribe({
      next: (res) => {
        console.log('Connecté !', res);

        // ✅ Redirection après connexion
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Erreur connexion', err);
      }
    });
  }

}
