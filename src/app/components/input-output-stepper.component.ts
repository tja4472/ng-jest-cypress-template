import { Component, effect, input, output } from '@angular/core';

export type Name = {
  name: string;
};

@Component({
  selector: 'app-input-signal-stepper',
  template: `
    <div>
      <button aria-label="issc-decrement" (click)="decrement()">-</button>
      <span data-test="issc-counter">{{ count }}</span>
      <button aria-label="issc-increment" (click)="increment()">+</button>
    </div>
    <div data-test="issc-nameDiv">Name: {{ nameObject().name }}</div>
  `,
  standalone: true,
})
export class InputOutputStepperComponent {
  initalCount = input<number>(0);
  nameObject = input<Name>({ name: 'fred' });

  change = output<number>();

  count = 0;

  constructor() {
    effect(() => {
      this.count = this.initalCount();
    });
  }

  increment(): void {
    this.count++;
    this.change.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.change.emit(this.count);
  }
}
