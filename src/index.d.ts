import { ApplicationRef } from '@angular/core';

import { TestService } from '@app/services/test.service';
import { ServiceAService } from './app/services/service-a.service';

declare global {
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    TestService?: TestService;
  }
}
