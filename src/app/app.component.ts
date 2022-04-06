import { Component } from '@angular/core';

import { ServiceAService } from '@app/services/service-a.service';
import { TestService } from '@app/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-jest-cypress-template';

  constructor(serviceA: ServiceAService, testService: TestService) {}
}
