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
import { AdminDashboard } from './admin-layout/admin-dashboard/admin-dashboard';
import { AdminShowOrder } from './admin-show-order/admin-show-order';
import { Comming } from './single-layout/comming/comming';
import { comingSoonGuard } from './guards/coming-soon-guard';

export const routes: Routes = [
  {path:'coming-soon',component:Comming},
  //Pour l'user
  {
    path: '',
    component: UserLayout,
    children:[
      { path: '', component: Landing , canActivate:[comingSoonGuard]}, // par défaut = Landing
      { path: 'contact', component: Contact , canActivate:[comingSoonGuard]},
      { path: 'tracking', component: Tracking , canActivate:[comingSoonGuard]},
      {path:'categories', component: CategoriesList, canActivate:[comingSoonGuard]},
      { path: 'checkout/:id', component: Checkout, canActivate:[comingSoonGuard] },
      { path: 'my-orders', component: MyOrders ,canActivate:[comingSoonGuard] },
      {path:'login', component: Login, canActivate:[authGuard, comingSoonGuard]},
      {path:'register', component: Register, canActivate:[authGuard,comingSoonGuard ]},
    ]
  },

  //Pour l'admin
  {
    path: 'admin',
    component: AdminLayout,
    children:[
      { path: '', component: AdminDashboard }, // par défaut = Landing
      { path: 'contact', component: Contact },
      { path: 'tracking', component: Tracking },
      {path:'categories', component: CategoriesList},

      {path:'show-order/:id', component: AdminShowOrder}
    ]
  },

];
