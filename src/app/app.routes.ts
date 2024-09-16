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
  //
  {
    path: 'examples',
    loadChildren: () =>
      import('./features/examples/examples.routes').then((m) => m.routes),
  },
  {
    path: 'feature-1',
    loadChildren: () =>
      import('./features/feature-1/feature-1.routes').then((m) => m.routes),
  },
  {
    path: 'feature-2',
    loadChildren: () =>
      import('./features/feature-2/feature-2.routes').then((m) => m.routes),
  },
];
