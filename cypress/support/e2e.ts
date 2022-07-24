// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands';

/*
// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
*/
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Adapted from https://github.com/Muritavo/cypress-toolkit/blob/main/src/support/utility.ts#L36
const origLog = Cypress.log;

// Filter out Firebase xhr log entries.
Cypress.log = function (opts, ...other) {
  // console.log('>>>>>>>>>>>>>>>>');
  // console.log('>> opts.displayName>', opts.displayName);

  if (
    (opts.displayName && ['xhr', 'image'].includes(opts.displayName)) ||
    (opts.name && ['Coverage', 'readfile'].includes(opts.name)) ||
    ['@cypress/code-coverage'].some((a) =>
      opts.message
        ? opts.message[0] && String(opts.message[0]).includes(a)
        : false
    )
  ) {
    // console.log('== opts.message>', opts.message);
    // console.log('== opts.displayName>', opts.displayName);
    // console.log('== opts.type>', opts.type);
    // delete: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    delete opts.message;
    delete opts.displayName;
    delete opts.type;
    const p = new Proxy(
      {},
      {
        get: () => {
          return () => p;
        },
      }
    );

    return p;
  }

  return origLog(opts, ...other) as any;
};
