// home.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },

  // which is easy to extend in the future, eg
  {
    path: 'editor',
    loadComponent: () =>
      import('./home-editor.component').then((m) => m.HomeEditorComponent),
  },

  // or a larger sub-feature
  {
    path: 'forecast',
    loadChildren: () =>
      import('./forecast/forecast.routes').then((m) => m.routes),
  },
];
