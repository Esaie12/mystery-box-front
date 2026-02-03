import { Routes } from '@angular/router';
import { Contact } from './user-layout/contact/contact';
import { Landing } from './user-layout/landing/landing';
import { Tracking } from './user-layout/tracking/tracking';
import { CategoriesList } from './user-layout/categories-list/categories-list';
import { Login } from './auth-layout/login/login';
import { Checkout } from './user-layout/checkout/checkout';
import { authGuard } from './guards/auth-guard';
import { Register } from './auth-layout/register/register';
import { MyOrders } from './user-layout/my-orders/my-orders';
import { UserLayout } from './user-layout/user-layout';
import { AdminLayout } from './admin-layout/admin-layout';

export const routes: Routes = [
  //Pour l'user
  {
    path: '',
    component: UserLayout,
    children:[
      { path: '', component: Landing }, // par défaut = Landing
      { path: 'contact', component: Contact },
      { path: 'tracking', component: Tracking },
      {path:'categories', component: CategoriesList},
      { path: 'checkout/:id', component: Checkout },
      { path: 'my-orders', component: MyOrders },
      {path:'login', component: Login, canActivate:[authGuard]},
      {path:'register', component: Register, canActivate:[authGuard]},
    ]
  },

  //Pour l'admin
  {
    path: 'admin',
    component: AdminLayout,
    children:[
      { path: '', component: Landing }, // par défaut = Landing
      { path: 'contact', component: Contact },
      { path: 'tracking', component: Tracking },
      {path:'categories', component: CategoriesList},
    ]
  },

];
