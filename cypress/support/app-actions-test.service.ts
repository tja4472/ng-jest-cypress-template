/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

const SERVICE_NAME = 'AppActionsTestService';

export const getService = () =>
  cy.window().should('have.property', SERVICE_NAME);

export const getProperty = () =>
  getService()
    .should('have.a.property', 'property')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .then((s) => <string>(<unknown>s));

export const callMethod1 = (text: string) =>
  cy.window().its(SERVICE_NAME).invoke('method1', text);

export const callPromise1 = (text: string) =>
  // cypress v11
  // cy.window().its(SERVICE_NAME).invoke('promise1', text);
  cy
    .window()
    .its(SERVICE_NAME)
    .then((api) => api.promise1(text));
