// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands';

/*
// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
*/
/*
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
    }
  }
}
*/

beforeEach(() => {
  // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});
