import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-user-show',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-user-show.html',
})
export class AdminUserShow {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  userId: number = Number(this.route.snapshot.paramMap.get('id'));
  user$: Observable<User> = this.usersService.getUser(this.userId);
}
