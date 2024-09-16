import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./examples.component').then((m) => m.ExamplesComponent),
  },
];
