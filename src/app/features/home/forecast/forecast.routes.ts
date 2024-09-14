// home.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./forecast.component').then((m) => m.HomeForecastComponent),
  },
];
