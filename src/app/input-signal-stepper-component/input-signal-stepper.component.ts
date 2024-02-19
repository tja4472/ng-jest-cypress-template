import { Component, effect, EventEmitter, input, Output } from '@angular/core';

export interface Name {
  name: string;
}

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
export class InputSignalStepperComponent {
  // @Input() count = 0;
  // @Input() nameObject: Name = { name: 'fred' };

  initalCount = input<number>(0);
  nameObject = input<Name>({ name: 'fred' });
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();

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
