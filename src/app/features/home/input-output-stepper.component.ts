import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOutputStepperComponent {
  //
  cdr = inject(ChangeDetectorRef);

  initalCount = input<number>(0);
  nameObject = input<Name>({ name: 'fred' });

  countChanged = output<number>();

  count = 0;

  constructor() {
    effect(() => {
      this.count = this.initalCount();
      this.cdr.markForCheck();
    });
  }

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.countChanged.emit(this.count);
  }
}
