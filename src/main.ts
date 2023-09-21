import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent)
  .then((appRef) => {
    // For Cypress app actions
    if (window.Cypress) {
      // and save the application reference
      window.appRef = appRef;
    }
  })
  .catch((e) => {
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
