import { Component } from '@angular/core';

import { EnvironmentService } from '@app/environment.service';

import { ServiceAService } from '@app/services/service-a.service';
import { TestService } from '@app/services/test.service';

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
    serviceA: ServiceAService,
    testService: TestService
  ) {
    console.log('environmentService.appCode>', environmentService.appCode);
    this.appCode = environmentService.appCode;
  }
}
