import { Component } from '@angular/core';

import { InputOutputStepperComponent } from './input-output-stepper.component';

@Component({
  selector: 'app-home',
  imports: [InputOutputStepperComponent],
  template: `
    <p>home works!</p>
    <a href="/home/editor">editor</a>
    <br />
    <a href="/home/forecast">forecast</a>
    <br />
    <h1>Examples</h1>
    <a href="/examples">Examples</a>
    <h1>Features-1</h1>
    <a href="/feature-1">feature-1</a>
    <h1>Features-2</h1>
    <a href="/feature-2">feature-2</a>

    <h1>InputSignal Stepper</h1>
    <app-input-signal-stepper
      [initalCount]="200"
      [nameObject]="{ name: 'Fred' }"
    ></app-input-signal-stepper>
  `,
  styles: ``,
})
export class HomeComponent {}
