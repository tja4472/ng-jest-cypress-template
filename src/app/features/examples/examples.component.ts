import { Component } from '@angular/core';

import { FormsComponent } from './ui/forms/03-forms';
import { StepperComponent } from './ui/stepper/stepper.component';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [FormsComponent, StepperComponent],
  template: `
    <p>examples works!</p>
    <h1>FormsComponent</h1>
    <app-fixture-forms></app-fixture-forms>
    <h1>Stepper</h1>
    <app-stepper [count]="100" [nameObject]="{ name: 'Harry' }"></app-stepper>
  `,
  styles: ``,
})
export class ExamplesComponent {}
