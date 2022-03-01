import { ApplicationRef } from '@angular/core';

import * as TestService from '../../support/test.service';

describe('App Actions', () => {
  const getAppRef = () =>
    cy
      .window()
      .should('have.property', 'appRef')
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .then((x) => <ApplicationRef>(<unknown>x)); // make the type work

  /**
   * Calls `appRef.tick()` to force UI refresh
   */
  const tick = () => getAppRef().invoke('tick');

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
  });
});
