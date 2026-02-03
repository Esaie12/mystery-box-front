import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet],
  template: ` Saltu <router-outlet></router-outlet> `,
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

}
