import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature-1.component').then((m) => m.Feature1Component),
  },
];
