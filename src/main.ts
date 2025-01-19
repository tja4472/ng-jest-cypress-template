import { inject, runInInjectionContext } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppActionsTestService } from '@app/services/app-actions-test.service';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // Only do if DEBUG
    // Move window.AppActionsTestService from constructor

    // For Cypress app actions
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (window.Cypress) {
      // and save the application reference
      window.appRef = appRef;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      runInInjectionContext(appRef.injector, () => {
        //
        const x = inject(AppActionsTestService);
        console.log('HHHAAAAA>', x.property);
        window.AppActionsTestService = x;
      });

      // https://stackoverflow.com/questions/78293665/inject-must-be-called-from-an-injection-context-after-upgrading-angular-from-v
    }
  })
  .catch((e: unknown) => {
    console.error(e);
  });

/*
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => {
    console.error(err);
  });
*/

/*
https://www.bitovi.com/blog/developer-preview-of-standalone-support-in-angular-elements

// get a hand on the `ApplicationRef` to access its injector
createApplication({ providers: [] }).then((appRef) => {
	// create a constructor of a custom element
	const votingNew = createCustomElement(
		VotingNewComponent, // component for Angular element
		{ injector: appRef.injector } // used to inject the component to the DOM
	);

	// register in a browser
	customElements.define('voting-new', votingNew);
});
*/
