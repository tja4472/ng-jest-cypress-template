import { ApplicationRef } from '@angular/core';

const getAppRef = () =>
  cy
    .window()
    .should('have.property', 'appRef')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .then((x) => <ApplicationRef>(<unknown>x)); // make the type work

/**
 * Calls `appRef.tick()` to force UI refresh
 */
export const tick = () => getAppRef().invoke('tick');
