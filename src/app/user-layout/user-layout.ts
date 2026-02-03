import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports:[RouterOutlet, Header, Footer ],
  template: `
  <body class="bg-gradient-to-br from-rose-950 via-red-900 to-pink-900 min-h-screen text-white hearts-bg">
   
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer/>
  </body>
  `,

})
export class UserLayout {

}
