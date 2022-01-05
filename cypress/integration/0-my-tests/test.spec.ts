import { navigateTo, getGreeting } from '../../support/po';

describe('Tests', () => {
  beforeEach(navigateTo);

  it('should display welcome message', () => {
    getGreeting().contains('Welcome');
  });

  it('[cy.get]should display welcome message', () => {
    cy.get('[data-cy=greeting]').contains('Welcome');
  });

  it('[cy.dataCy]should display welcome message', () => {
    cy.dataCy('greeting').contains('Welcome');
  });
});
