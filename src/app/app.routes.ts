import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login.component';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    //   {
    //     path: 'campaigns',
    //     loadComponent: () =>
    //       import('./features/campaigns').then((m) => m.CampaignsComponent),
    //   },
  
    ]
  }
];
