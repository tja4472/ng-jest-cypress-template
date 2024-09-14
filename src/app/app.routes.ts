// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // application with a single feature
  // implemented as a first lazy loaded feature
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.routes),
  },
];
