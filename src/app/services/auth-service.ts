import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';



export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    // autres infos selon ton API
  };
}

export interface RegisterData {
  name: string;  
  email: string;
  phone: string;
  password: string; 
  password_confirmation: string;
  accept_terms: boolean; 
}

export interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = environment.apiUrl+'/auth';
  //private apiUrl = 'http://127.0.0.1:8000/api/auth'; // Remplace par ton URL API

  constructor(private http: HttpClient) {}

  /**
   * Connexion
   */
  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => {
        // Sauvegarde du token dans localStorage
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  /**
   * Inscription
   */
  register(data: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => {
        // Sauvegarde du token dans localStorage
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem('authToken');
  }


  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Récupère le token courant
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUser(): User | null {
    const userString = localStorage.getItem('user');
    if (!userString) return null;

    try {
      return JSON.parse(userString) as User;
    } catch (e) {
      console.error('Impossible de parser l’utilisateur depuis localStorage', e);
      return null;
    }
  }

}
