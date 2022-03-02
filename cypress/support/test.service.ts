const SERVICE_NAME = 'TestService';

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
  cy.window().its(SERVICE_NAME).invoke('promise1', text);
