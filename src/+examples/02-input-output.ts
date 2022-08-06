import { Component, EventEmitter, Input, Output } from '@angular/core';

// https://github.com/testing-library/angular-testing-library/blob/main/apps/example-app/src/app/examples/02-input-output.ts

@Component({
  selector: 'app-fixture',
  template: `
    <button (click)="value = value - 1">Decrement</button>
    <span data-testid="value">{{ value }}</span>
    <button (click)="value = value + 1">Increment</button>

    <button (click)="sendValue.emit(value)">Send</button>
  `,
})
export class InputOutputComponent {
  @Input() value = 0;
  @Output() sendValue = new EventEmitter<number>();
}
