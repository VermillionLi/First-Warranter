import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-page',
    loadComponent: () => import('./pages/home-page/home-page.page').then( m => m.HomePagePage)
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
];
