import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
 
{
  path: 'cuentas',
  loadComponent: () => import('./features/landing/cuenta-landing/cuenta-landing.component').then(m => m.CuentaLandingComponent ),
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
