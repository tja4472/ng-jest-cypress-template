// https://docs.cypress.io/guides/component-testing/angular/overview

// Component to test.
import { InputSignalStepperComponent } from '@app/input-signal-stepper-component/input-signal-stepper.component';
import { createOutputSpy } from 'cypress/angular';

// Set up some constants for the selectors
const incrementSelector = '[aria-label=issc-increment]';
// const decrementSelector = '[aria-label=issc-decrement]';

describe('InputSignalStepperComponent', () => {
  describe('with Angular template syntax', () => {
    it('mounts', () => {
      // Arrange
      cy.mount(`<app-input-signal-stepper></app-input-signal-stepper>`, {
        imports: [InputSignalStepperComponent],
      });
    });

    it('check defaults', () => {
      // Arrange
      cy.mount(`<app-input-signal-stepper></app-input-signal-stepper>`, {
        imports: [InputSignalStepperComponent],
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
          imports: [InputSignalStepperComponent],
        }
      );

      // Assert
      cy.getBySel('issc-counter').should('have.text', '200');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: David');
    });

    it('@Output', () => {
      // Arrange
      cy.mount(
        `<app-input-signal-stepper
          (change)='change.emit($event)'
        ></app-input-signal-stepper>`,
        {
          imports: [InputSignalStepperComponent],
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
      cy.mount(InputSignalStepperComponent);
    });

    it('check defaults', () => {
      // Arrange
      cy.mount(InputSignalStepperComponent, {});

      // Assert
      cy.getBySel('issc-counter').should('have.text', '0');
      cy.getBySel('issc-nameDiv').should('have.text', 'Name: fred');
    });

    /*
  Gives error
  Type 'number' is not assignable to type 'InputSignal<number>'.ts(2322)
  */
    /*
  it('pass data via componentProperties', () => {
    // Arrange
    cy.mount(InputSignalStepperComponent, {
      componentProperties: {
        initalCount: 100
      }
    });

    // Assert
    cy.getBySel('issc-counter').should('have.text', '0');
    cy.getBySel('issc-nameDiv').should('have.text', 'Name: fred');    
  });  
*/
  });
});
