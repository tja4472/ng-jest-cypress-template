// https://github.com/cypress-io/cypress-component-testing-apps/tree/main/angular-standalone

import { signal } from '@angular/core';
import { createOutputSpy } from 'cypress/angular-signals';

// Component to test.
import { TestComponent } from '@app/components/signals/test-component.component';

describe('StepperComponent - Inferred Generic Type', () => {
  it('mounts', () => {
    const titleProp = 'Test Component';

    // Type 'string' is not assignable to type 'InputSignal<string>'.ts(2322)

    cy.mount(TestComponent, {
      componentProperties: {
        title: titleProp,
      },
    });

    cy.get('[data-cy="test-component-title-display"]').should(
      'have.text',
      'Test Component'
    );
  });
});

describe('TestComponent', () => {
  it('works with inferred generic type input<required>', () => {
    const titleProp = 'Test Component';
    cy.mount(TestComponent, {
      componentProperties: {
        title: titleProp,
      },
    });

    cy.get('[data-cy="test-component-title-display"]').should(
      'have.text',
      'Test Component'
    );
  });

  it('works with inferred generic type model', () => {
    cy.mount(TestComponent, {
      componentProperties: {
        title: 'Test Component',
        count: 3,
      },
    });

    cy.get('[data-cy="test-component-count-display"]').should('have.text', '3');
  });

  it('works with writable signal input<required> (one-way data binding)', () => {
    const myTitlePropAsSignal = signal('Test Component');
    cy.mount(TestComponent, {
      componentProperties: {
        title: myTitlePropAsSignal,
      },
    });

    cy.get('[data-cy="test-component-title-display"]').should(
      'have.text',
      'Test Component'
    );
    cy.then(() => {
      // now set the input() through a signal to update the one-way binding
      myTitlePropAsSignal.set('FooBar');
    });

    cy.get('[data-cy="test-component-title-display"]').should(
      'have.text',
      'FooBar'
    );
  });

  it('works with writable signal model (two-way data binding)', () => {
    const count = signal(5);
    cy.mount(TestComponent, {
      componentProperties: {
        title: 'Test Component',
        count,
      },
    });

    cy.then(() => {
      // now set the model() through a signal to update the binding in the component
      count.set(8);
    });

    cy.get('[data-cy="test-component-count-display"]').should('have.text', '8');

    // some action occurs that changes the count to 9 inside the component, which updates the binding in our test
    cy.get('[data-cy="test-component-count-incr"]').click();
    cy.get('[data-cy="test-component-count-display"]').should('have.text', '9');
    cy.then(() => {
      expect(count()).to.equal(9);
    });
  });

  describe('output spies', () => {
    it('works with createOutputSpy() for writable signal model()', () => {
      cy.mount(TestComponent, {
        componentProperties: {
          title: 'Test Component',
          count: 4,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          countChange: createOutputSpy('countChange'),
        },
      });

      // some action occurs that changes the count
      cy.get('[data-cy="test-component-count-incr"]').click();

      cy.get('@countChange').should('have.been.called');
    });

    it('works with "autoSpyOutputs=true"', () => {
      cy.mount(TestComponent, {
        componentProperties: {
          title: 'Test Component',
          count: 4,
        },
        autoSpyOutputs: true,
      });

      // some action occurs that changes the count
      cy.get('[data-cy="test-component-count-incr"]').click();

      cy.get('@countChangeSpy').should('have.been.called');
    });
  });
});
