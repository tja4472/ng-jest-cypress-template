import { Component } from '@angular/core';
import { FormsComponent } from '../../../+examples/03-forms';
import { StepperComponent } from '../../stepper/stepper.component';
import { InputOutputStepperComponent } from '../../components/input-output-stepper.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsComponent, StepperComponent, InputOutputStepperComponent],
  template: `
    <p>home works!</p>
    <a href="/home/editor">editor</a>
    <br />
    <a href="/home/forecast">forecast</a>
    <br />
    <h1>FormsComponent</h1>
    <app-fixture-forms></app-fixture-forms>
    <h1>Stepper</h1>
    <app-stepper [count]="100" [nameObject]="{ name: 'Harry' }"></app-stepper>
    <h1>InputSignal Stepper</h1>
    <app-input-signal-stepper
      [initalCount]="200"
      [nameObject]="{ name: 'Fred' }"
    ></app-input-signal-stepper>
  `,
  styles: ``,
})
export class HomeComponent {}
