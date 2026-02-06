import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- nécessaire pour async pipe
import { Observable } from 'rxjs';
import { UsersService, User } from '../services/users.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,          // <-- marque le composant comme standalone
  imports: [CommonModule],    // <-- async pipe et ngFor/ngIf disponibles
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
    // tu peux router vers /admin/users/edit/:id
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }
}
