import { ApplicationRef } from '@angular/core';

import { AppActionsTestService } from '@app/services/app-actions-test.service';

// For Cypress app actions
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    AppActionsTestService?: AppActionsTestService;
  }
}
