import { tick } from 'cypress/support/app-actions.util';
import * as TestService from '../../support/test.service';

describe('App Actions', () => {
  before(() => {
    cy.viewport('ipad-2', 'landscape');
    cy.visit('/');
    TestService.getService();
  });

  it('testService', () => {
    TestService.getProperty().should('equal', 'testServiceProperty');
    TestService.callMethod1('dd').should('equal', 'ddA');
    TestService.getProperty().should('equal', 'ddA');
    TestService.callPromise1('ee').should('equal', 'eeB');
    tick();
  });
});
