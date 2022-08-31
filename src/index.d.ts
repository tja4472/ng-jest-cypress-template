import { ApplicationRef } from '@angular/core';

import { AppActionsTestService } from '@app/services/app-actions-test.service';

// For Cypress app actions
declare global {
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    AppActionsTestService?: AppActionsTestService;
  }
}
