import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature-2.component').then((m) => m.Feature2Component),
  },
];
