/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventEmitter } from '@angular/core';

import { createOutputSpy, MountConfig } from 'cypress/angular';

import { DataTestIds, SpyAliases, SpyIds } from './types';

// Component to test.
import {
  Name,
  StepperComponent,
} from '@app/features/examples/ui/stepper/stepper.component';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* StepperComponent
    @Input() count = 0;
    @Input() nameObject: Name = { name: 'fred' };
    @Output() change = new EventEmitter();
*/

type EventEmitters = 'change';

type DataTestIdNames = 'counter' | 'nameDiv';

const spyAliases: SpyAliases<EventEmitters> = {
  change: 'changeSpy',
} as const;

const spyIds: SpyIds<EventEmitters> = {
  change: '@changeSpy',
} as const;

const dataTestIds: DataTestIds<DataTestIdNames> = {
  counter: 'counter',
  nameDiv: 'nameDiv',
} as const;

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
      change: createOutputSpy(spyAliases.change),
    },
  };

  return config;
}

function mountComponent(defaults: Defaults) {
  return cy.mount(StepperComponent, getConfig(defaults));
}

// Set up some constants for the selectors
const incrementSelector = '[aria-label=increment]';
const decrementSelector = '[aria-label=decrement]';

describe('StepperComponent', () => {
  it('mounts', () => {
    mountComponent(defaults);
  });

  it('stepper should default to 0', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '0');
  });

  it('supports an "Input()" count that sets the value', () => {
    // Arrange
    const source = { ...defaults };
    source.count = 100;
    mountComponent(source);

    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '100');
  });

  it('when the increment button is pressed, the counter is incremented', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '1');
  });

  it('when the decrement button is pressed, the counter is decremented', () => {
    // Arrange
    cy.mount(StepperComponent, {});

    // Act
    cy.get(decrementSelector).click();
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '-1');
  });

  it('when clicking increment and decrement buttons, the counter is changed as expected', () => {
    const source = { ...defaults };
    source.count = 100;
    mountComponent(source);

    cy.getBySel(dataTestIds.counter).should('have.text', '100');
    cy.get(incrementSelector).click();
    cy.getBySel(dataTestIds.counter).should('have.text', '101');
    cy.get(decrementSelector).click();
    cy.get(decrementSelector).click();
    cy.getBySel(dataTestIds.counter).should('have.text', '99');
  });

  it('0-clicking + fires a change event with the incremented value', () => {
    // Arrange
    mountComponent(defaults);

    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get(spyIds.change).should('have.been.calledWith', 1);
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
    cy.get(spyIds.change).should('have.been.calledWith', 101);
  });

  it('2-clicking + fires a change event with the incremented value', () => {
    // Arrange
    mountComponent(defaults);
    cy.get(incrementSelector).click();
    cy.get(spyIds.change).should('have.been.called');
  });

  it('set Input object', () => {
    const testName: Name = { name: 'Harry' };

    const source = { ...defaults };
    source.nameObject = testName;
    mountComponent(source);

    cy.getBySel(dataTestIds.nameDiv).should('contain.text', testName.name);
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
        imports: [StepperComponent],
      }
    );

   cy.getBySel(dataTestIds.nameDiv).should('contain.text', 'Harry');
  });

  it('set Input object using JSON.stringify', () => {
    const testName: Name = { name: 'Harry' };

    const json = JSON.stringify(testName);

    cy.mount(
      `<app-stepper 
        [nameObject]= '${json}'
       ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );

   cy.getBySel(dataTestIds.nameDiv).should('contain.text', 'Harry');
  });
*/
});

describe('StepperComponent using Angular template syntax', () => {
  it('mounts', () => {
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
  });

  it('stepper should default to 0', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '0');
  });

  it('supports an "Input()" count that sets the value', () => {
    // Arrange
    cy.mount(
      `<app-stepper 
        [count]='100'
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '100');
  });

  it('when the increment button is pressed, the counter is incremented', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '1');
  });

  it('when the decrement button is pressed, the counter is decremented', () => {
    // Arrange
    cy.mount(
      `<app-stepper
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
    // Act
    cy.get(decrementSelector).click();
    // Assert
    cy.getBySel(dataTestIds.counter).should('have.text', '-1');
  });

  it('when clicking increment and decrement buttons, the counter is changed as expected', () => {
    cy.mount(
      `<app-stepper 
        [count]='100'
      ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );
    cy.getBySel(dataTestIds.counter).should('have.text', '100');
    cy.get(incrementSelector).click();
    cy.getBySel(dataTestIds.counter).should('have.text', '101');
    cy.get(decrementSelector).click();
    cy.get(decrementSelector).click();
    cy.getBySel(dataTestIds.counter).should('have.text', '99');
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
        imports: [StepperComponent],
      }
    );
    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get(spyIds.change).should('have.been.calledWith', 1);
  });

  it('1-clicking + fires a change event with the incremented value', () => {
    cy.mount(
      `<app-stepper 
        count='100' 
        (change)='change.emit($event)'
      ></app-stepper>`,
      {
        componentProperties: { change: new EventEmitter() },
        imports: [StepperComponent],
      }
    ).then((wrapper) => {
      console.log({ wrapper });
      cy.spy(wrapper.component.change, 'emit').as('changeSpy');
      return cy.wrap(wrapper).as('angular');
    });
    cy.get(incrementSelector).click();
    cy.get(spyIds.change).should('have.been.calledWith', 101);
  });

  it('2-clicking + fires a change event with the incremented value', () => {
    // Arrange
    cy.mount(
      `<app-stepper 
        (change)='change.emit($event)'
      ></app-stepper>`,
      {
        imports: [StepperComponent],
        componentProperties: {
          change: createOutputSpy<boolean>('changeSpy'),
        },
      }
    );
    cy.get(incrementSelector).click();
    cy.get(spyIds.change).should('have.been.called');
  });

  it('set Input object', () => {
    const testName: Name = { name: 'Harry' };

    cy.mount(
      `<app-stepper 
        [nameObject]="{ name: 'Harry' }"
       ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );

    cy.getBySel(dataTestIds.nameDiv).should('contain.text', 'Harry');
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
        imports: [StepperComponent],
      }
    );

    cy.getBySel(dataTestIds.nameDiv).should('contain.text', 'Harry');
  });

  it('set Input object using JSON.stringify', () => {
    const testName: Name = { name: 'Harry' };

    const json = JSON.stringify(testName);

    cy.mount(
      `<app-stepper 
        [nameObject]= '${json}'
       ></app-stepper>`,
      {
        imports: [StepperComponent],
      }
    );

    cy.getBySel(dataTestIds.nameDiv).should('contain.text', 'Harry');
  });
});
