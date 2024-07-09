import { Component, input, model } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  standalone: true,
})
export class TestComponent {
  title = input.required<string>();
  count = model<number>(1);
}
