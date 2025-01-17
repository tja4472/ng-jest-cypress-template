// https://docs.cypress.io/guides/component-testing/angular/overview

// Component to test.
import { InputOutputStepperComponent } from '@app/features/home/input-output-stepper.component';

import { createOutputSpy } from 'cypress/angular';

// Set up some constants for the selectors
const incrementSelector = '[aria-label=issc-increment]';
// const decrementSelector = '[aria-label=issc-decrement]';

describe('InputOutputStepperComponent', () => {
  describe('with Angular template syntax', () => {
    it('mounts', () => {
      // Arrange
      cy.mount(`<app-input-signal-stepper></app-input-signal-stepper>`, {
        imports: [InputOutputStepperComponent],
      });
    });

    it('check defaults', () => {
      // Arrange
      cy.mount(`<app-input-signal-stepper></app-input-signal-stepper>`, {
        imports: [InputOutputStepperComponent],
      });

      // Assert
      cy.getBySel('issc-counter').should('have.text', '0');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: fred');
    });

    it('input:pass data', () => {
      // Arrange
      cy.mount(
        `<app-input-signal-stepper
            [initalCount]="200"
            [nameObject]="{ name: 'David' }"
        ></app-input-signal-stepper>`,
        {
          imports: [InputOutputStepperComponent],
        }
      );

      // Assert
      cy.getBySel('issc-counter').should('have.text', '200');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: David');
    });

    it.only('@Output', () => {
      // Arrange
      cy.mount(
        `<app-input-signal-stepper
          (countChanged)='change.emit($event)'
        ></app-input-signal-stepper>`,
        {
          imports: [InputOutputStepperComponent],
          componentProperties: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            change: createOutputSpy<boolean>('changeSpy'),
          },
        }
      );
      cy.getBySel('issc-counter').should('have.text', '0');
      cy.get(incrementSelector).click();
      cy.get('@changeSpy').should('have.been.called');
      cy.getBySel('issc-counter').should('have.text', '1');
    });
  });

  describe('with componentProperties', () => {
    it('mounts', () => {
      cy.mount(InputOutputStepperComponent);
    });

    it('check defaults', () => {
      // Arrange
      cy.mount(InputOutputStepperComponent, {});

      // Assert
      cy.getBySel('issc-counter').should('have.text', '0');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: fred');
    });

    it('pass data via componentProperties', () => {
      // Arrange
      cy.mount(InputOutputStepperComponent, {
        componentProperties: {
          initalCount: 100,
        },
      });

      // Assert
      cy.getBySel('issc-counter').should('have.text', '100');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: fred');
    });

    it('output() - Using createOutputSpy()', () => {
      // Arrange
      cy.mount(InputOutputStepperComponent, {
        componentProperties: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          countChanged: createOutputSpy<boolean>('changeSpy'),
        },
      });

      cy.getBySel('issc-counter').should('have.text', '0');
      cy.get(incrementSelector).click();
      cy.get('@changeSpy').should('have.been.called');
      cy.getBySel('issc-counter').should('have.text', '1');
    });

    /*
      get@changeSpy
      CypressError
      cy.get() could not find a registered alias for: @changeSpy.
      Available aliases are: initalCountChangeSpy.    
    */
    it.skip('output() - Using autoSpyOutputs', () => {
      // Arrange
      cy.mount(InputOutputStepperComponent, {
        autoSpyOutputs: true,
        componentProperties: {
          initalCount: 100,
        },
      });

      cy.getBySel('issc-counter').should('have.text', '100');
      cy.get(incrementSelector).click();
      cy.get('@changeSpy').should('have.been.called');
      cy.getBySel('issc-counter').should('have.text', '1');
    });
  });
});
