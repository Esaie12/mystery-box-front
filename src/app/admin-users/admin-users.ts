import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';// Pour le routing
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Ajouter RouterModule ici to avoid error
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css']
})
export class AdminUsersComponent implements OnInit {

  users$!: Observable<User[]>;
  private usersService = inject(UsersService);

  constructor() {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.usersService.getUsers();
  }

  editUser(id: number) {
    console.log('Edit user', id);
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }
}
