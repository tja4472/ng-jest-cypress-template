const TEST_SERVICE = 'TestService';

export const getService = () =>
  cy.window().should('have.property', TEST_SERVICE);

export const getProperty = () =>
  getService()
    .should('have.a.property', 'property')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .then((s) => <string>(<unknown>s));

export const callMethod1 = (text: string) =>
  cy.window().its(TEST_SERVICE).invoke('method1', text);

export const callPromise1 = (text: string) =>
  cy.window().its(TEST_SERVICE).invoke('promise1', text);
