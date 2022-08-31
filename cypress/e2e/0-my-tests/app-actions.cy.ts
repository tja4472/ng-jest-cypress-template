import { tick } from 'cypress/support/app-actions.util';
import * as AppActionsTestService from '../../support/app-actions-test.service';

describe('App Actions', () => {
  before(() => {
    cy.viewport('ipad-2', 'landscape');
    cy.visit('/');
    AppActionsTestService.getService();
  });

  it('testService', () => {
    AppActionsTestService.getProperty().should(
      'equal',
      'appActionsTestServiceProperty'
    );
    AppActionsTestService.callMethod1('dd').should('equal', 'ddA');
    AppActionsTestService.getProperty().should('equal', 'ddA');
    AppActionsTestService.callPromise1('ee').should('equal', 'eeB');
    tick();
  });
});
