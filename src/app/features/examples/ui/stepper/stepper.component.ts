import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Name = {
  name: string;
};

@Component({
  selector: 'app-stepper',
  template: `
    <div>
      <button aria-label="decrement" (click)="decrement()">-</button>
      <span data-test="counter">{{ count }}</span>
      <button aria-label="increment" (click)="increment()">+</button>
    </div>
    <div data-test="nameDiv">Name: {{ nameObject.name }}</div>
  `,
  standalone: true,
})
export class StepperComponent {
  @Input() count = 0;
  @Input() nameObject: Name = { name: 'fred' };

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();

  increment(): void {
    this.count++;
    this.change.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.change.emit(this.count);
  }
}
