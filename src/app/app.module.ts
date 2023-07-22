import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputOutputComponent } from '../+examples/02-input-output';
import { FormsComponent } from '../+examples/03-forms';

import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    InputOutputComponent,
    FormsComponent,
    StepperComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  // bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    // For Cypress app actions
    appRef.bootstrap(AppComponent);
    if (window.Cypress) {
      // and save the application reference
      window.appRef = appRef;
    }
  }
}
