import { Component } from '@angular/core';

import { EnvironmentService } from '@app/environment.service';

import { AppActionsTestService } from '@app/services/app-actions-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-jest-cypress-template';
  appCode = '';

  constructor(
    environmentService: EnvironmentService,
    // For Cypress app actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appActionsTestService: AppActionsTestService
  ) {
    this.appCode = environmentService.appCode;
  }
}
