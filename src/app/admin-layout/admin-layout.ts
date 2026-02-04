import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdmin } from './header-admin/header-admin';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderAdmin],
  styleUrl: './admin-layout.css',
  template: `
  <body class="bg-gray-50">
    <app-header-admin></app-header-admin>
    <router-outlet></router-outlet>

    <footer class="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <div class="text-center text-gray-600">
            <p>© 2026 Mystery kdo - Administration</p>
        </div>
    </footer>
  </body>

  `,
})
export class AdminLayout {

}
