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

  it('stepper component', () => {
    cy.visit('/examples');
    cy.get('[data-test="counter"]').contains(100);
    cy.get('[data-test="nameDiv"]').contains('Harry');
  });

  it('input signal stepper component', () => {
    cy.get('[data-test="issc-counter"]').contains(200);
    cy.get('[data-test="issc-nameDiv"]').contains('Fred');
  });
});
