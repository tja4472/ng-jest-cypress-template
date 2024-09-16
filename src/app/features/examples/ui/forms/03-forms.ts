/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

// https://github.com/testing-library/angular-testing-library/blob/main/apps/example-app/src/app/examples/03-forms.ts

@Component({
  selector: 'app-fixture-forms',
  template: `
    <form [formGroup]="form" name="form">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          formControlName="name"
          required
        />
      </div>

      <div>
        <label for="score">Score</label>
        <input
          type="number"
          id="score"
          name="score"
          formControlName="score"
          required
          min="0"
          max="10"
        />
      </div>

      <div>
        <label for="color">Color</label>
        <select id="color" name="color" formControlName="color">
          <option value="">---</option>
          <option *ngFor="let color of colors" [value]="color.id">
            {{ color.value }}
          </option>
        </select>
      </div>

      <div role="alert" *ngIf="formErrors.length">
        <p *ngFor="let error of formErrors">{{ error }}</p>
      </div>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
})
export class FormsComponent {
  colors = [
    { id: 'R', value: 'Red' },
    { id: 'B', value: 'Blue' },
    { id: 'G', value: 'Green' },
  ];
  form = this.formBuilder.group({
    name: ['', Validators.required],
    score: [
      0,
      { validators: [Validators.min(1), Validators.max(10)], updateOn: 'blur' },
    ],
    color: ['', Validators.required],
  });

  constructor(private formBuilder: UntypedFormBuilder) {}

  get formErrors() {
    return Object.keys(this.form.controls)
      .map((formKey) => {
        const controlErrors = this.form.get(formKey)?.errors;
        if (controlErrors) {
          return Object.keys(controlErrors).map((keyError) => {
            const error = controlErrors[keyError];
            switch (keyError) {
              case 'required':
                return `${formKey} is required`;
              case 'min':
                return `${formKey} must be greater than ${error.min}`;
              case 'max':
                return `${formKey} must be lesser than ${error.max}`;
              default:
                return `${formKey} is invalid`;
            }
          });
        }
        return [];
      })
      .reduce((errors, value) => errors.concat(value), [])
      .filter(Boolean);
  }
}
