import { EventEmitter } from '@angular/core';

import { createOutputSpy, MountConfig } from 'cypress/angular';

// Component to test.
import { Name, StepperComponent } from '@app/stepper/stepper.component';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* StepperComponent
    @Input() count = 0;
    @Input() nameObject: Name = { name: 'fred' };
    @Output() change = new EventEmitter();
*/
type Defaults = {
  count: number;
  nameObject: Name;
};

const defaults: Defaults = {
  count: 0,
  nameObject: { name: '' },
};

function getConfig(defaults: Defaults): MountConfig<StepperComponent> {
  const config: MountConfig<StepperComponent> = {
    componentProperties: {
      count: defaults.count,
      nameObject: defaults.nameObject,
      change: createOutputSpy('changeSpy'),
    },
  };

  return config;
}

function mountComponent(defaults: Defaults) {
  return cy.mount(StepperComponent, getConfig(defaults));
}

// Set up some constants for the selectors
const counterSelector = '[data-cy=counter]';
const incrementSelector = '[aria-label=increment]';
const decrementSelector = '[aria-label=decrement]';
const nameSelector = '[data-cy=nameDiv]';

describe('StepperComponent', () => {
  it('mounts', () => {
    mountComponent(defaults);
  });

  it('stepper should default to 0', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Assert
    cy.get(counterSelector).should('have.text', '0');
  });

  it('supports an "Input()" count that sets the value', () => {
    // Arrange
    const source = { ...defaults };
    source.count = 100;
    mountComponent(source);

    // Assert
    cy.get(counterSelector).should('have.text', '100');
  });

  it('when the increment button is pressed, the counter is incremented', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get(counterSelector).should('have.text', '1');
  });

  it('when the decrement button is pressed, the counter is decremented', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Act
    cy.get(decrementSelector).click();
    // Assert
    cy.get(counterSelector).should('have.text', '-1');
  });

  it('when clicking increment and decrement buttons, the counter is changed as expected', () => {
    const source = { ...defaults };
    source.count = 100;
    mountComponent(source);

    cy.get(counterSelector).should('have.text', '100');
    cy.get(incrementSelector).click();
    cy.get(counterSelector).should('have.text', '101');
    cy.get(decrementSelector).click().click();
    cy.get(counterSelector).should('have.text', '99');
  });

  it('0-clicking + fires a change event with the incremented value', () => {
    // Arrange
    mountComponent(defaults);

    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get('@changeSpy').should('have.been.calledWith', 1);
  });

  it('1-clicking + fires a change event with the incremented value', () => {
    cy.mount(StepperComponent, { componentProperties: { count: 100 } }).then(
      (wrapper) => {
        console.log({ wrapper });
        cy.spy(wrapper.component.change, 'emit').as('changeSpy');
        return cy.wrap(wrapper).as('angular');
      }
    );

    cy.get(incrementSelector).click();
    cy.get('@changeSpy').should('have.been.calledWith', 101);
  });

  it('2-clicking + fires a change event with the incremented value', () => {
    // Arrange
    mountComponent(defaults);
    cy.get(incrementSelector).click();
    cy.get('@changeSpy').should('have.been.called');
  });

  it('set Input object', () => {
    const testName: Name = { name: 'Harry' };

    const source = { ...defaults };
    source.nameObject = testName;
    mountComponent(source);

    cy.get(nameSelector).should('contain.text', testName.name);
  });
  /*
  it('set Input object using template string', () => {
    const testName: Name = { name: 'Harry' };
    const name = 'Harry';

    const json = JSON.stringify(testName);
    console.log('>', json);

    cy.mount(
      `<app-stepper 
        [nameObject]="{ name: '${name}' }"
       ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );

    cy.get(nameSelector).should('contain.text', 'Harry');
  });

  it('set Input object using JSON.stringify', () => {
    const testName: Name = { name: 'Harry' };

    const json = JSON.stringify(testName);

    cy.mount(
      `<app-stepper 
        [nameObject]= '${json}'
       ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );

    cy.get(nameSelector).should('contain.text', 'Harry');
  });
*/
});

describe('StepperComponent using Angular template syntax', () => {
  it('mounts', () => {
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
  });

  it('stepper should default to 0', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
    // Assert
    cy.get(counterSelector).should('have.text', '0');
  });

  it('supports an "Input()" count that sets the value', () => {
    // Arrange
    cy.mount(
      `<app-stepper 
        [count]='100'
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
    // Assert
    cy.get(counterSelector).should('have.text', '100');
  });

  it('when the increment button is pressed, the counter is incremented', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get(counterSelector).should('have.text', '1');
  });

  it('when the decrement button is pressed, the counter is decremented', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
    // Act
    cy.get(decrementSelector).click();
    // Assert
    cy.get(counterSelector).should('have.text', '-1');
  });

  it('when clicking increment and decrement buttons, the counter is changed as expected', () => {
    cy.mount(
      `<app-stepper 
        [count]='100'
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );
    cy.get(counterSelector).should('have.text', '100');
    cy.get(incrementSelector).click();
    cy.get(counterSelector).should('have.text', '101');
    cy.get(decrementSelector).click().click();
    cy.get(counterSelector).should('have.text', '99');
  });

  it('0-clicking + fires a change event with the incremented value', () => {
    // Arrange
    cy.mount(
      `<app-stepper 
        (change)='change.emit($event)'
      ></app-stepper>`,
      {
        componentProperties: {
          change: {
            emit: cy.spy().as('changeSpy'),
          },
        },
        declarations: [StepperComponent],
      }
    );
    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get('@changeSpy').should('have.been.calledWith', 1);
  });

  it('1-clicking + fires a change event with the incremented value', () => {
    cy.mount(
      `<app-stepper 
        count='100' 
        (change)='change.emit($event)'
      ></app-stepper>`,
      {
        componentProperties: { change: new EventEmitter() },
        declarations: [StepperComponent],
      }
    ).then((wrapper) => {
      console.log({ wrapper });
      cy.spy(wrapper.component.change, 'emit').as('changeSpy');
      return cy.wrap(wrapper).as('angular');
    });
    cy.get(incrementSelector).click();
    cy.get('@changeSpy').should('have.been.calledWith', 101);
  });

  it('2-clicking + fires a change event with the incremented value', () => {
    // Arrange
    cy.mount(
      `<app-stepper 
        (change)='change.emit($event)'
      ></app-stepper>`,
      {
        declarations: [StepperComponent],
        componentProperties: {
          change: createOutputSpy<boolean>('changeSpy'),
        },
      }
    );
    cy.get(incrementSelector).click();
    cy.get('@changeSpy').should('have.been.called');
  });

  it('set Input object', () => {
    const testName: Name = { name: 'Harry' };

    cy.mount(
      `<app-stepper 
        [nameObject]="{ name: 'Harry' }"
       ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );

    cy.get(nameSelector).should('contain.text', 'Harry');
  });

  it('set Input object using template string', () => {
    const testName: Name = { name: 'Harry' };
    const name = 'Harry';

    const json = JSON.stringify(testName);
    console.log('>', json);

    cy.mount(
      `<app-stepper 
        [nameObject]="{ name: '${name}' }"
       ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );

    cy.get(nameSelector).should('contain.text', 'Harry');
  });

  it('set Input object using JSON.stringify', () => {
    const testName: Name = { name: 'Harry' };

    const json = JSON.stringify(testName);

    cy.mount(
      `<app-stepper 
        [nameObject]= '${json}'
       ></app-stepper>`,
      {
        declarations: [StepperComponent],
      }
    );

    cy.get(nameSelector).should('contain.text', 'Harry');
  });
});
