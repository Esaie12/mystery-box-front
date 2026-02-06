// src/app/services/users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  //VersionProd : utiliser l'URL de l'environnement
 // private baseUrl = `${environment.apiUrl}/admin/users`; // Utilise l'URL de l'environnement
 // Version locale : utiliser l'URL directe de ton serveur local
  private baseUrl = 'http://localhost:8000/api/admin/users';
  constructor() {}

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.baseUrl)
      .pipe(map(resp => resp.users));
  }

  // Récupérer un utilisateur par ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}


