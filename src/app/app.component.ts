import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EnvironmentService } from '@app/services/environment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1 data-cy="greeting">Welcome to {{ title }}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'ng-jest-cypress-template';
  appCode = '';

  constructor() {
    // appActionsTestService: AppActionsTestService // eslint-disable-next-line @typescript-eslint/no-unused-vars // For Cypress app actions
    const environmentService = inject(EnvironmentService);

    this.appCode = environmentService.appCode;
    // const appActionsTestService = inject(AppActionsTestService)
    //console.log('HHH>', appActionsTestService.property)
    //window.AppActionsTestService = appActionsTestService;
  }
}
