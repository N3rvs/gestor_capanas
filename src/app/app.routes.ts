import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
 
{
  path: 'cuentas',
  loadComponent: () => import('./features/landing/cuenta-landing/cuenta-landing.component').then(m => m.CuentaLandingComponent ),
},

{
  path: 'registro',
  loadComponent: () =>
    import('./pages/registro/form.component').then(m => m.RegistroFormComponent)
},


      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
];
