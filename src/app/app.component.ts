import { Component } from '@angular/core';

import { ServiceAService } from '@app/services/service-a.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-jest-cypress-template';

  constructor(serviceA: ServiceAService) {}
}
