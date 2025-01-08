import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppActionsTestService {
  public property: string;

  constructor() {
    // For Cypress app actions
    if (window.Cypress) {
      //      window.AppActionsTestService = this;
    }

    this.property = 'appActionsTestServiceProperty';
  }

  method1(text: string): string {
    const result = text + 'A';
    this.property = result;
    return result;
  }

  promise1(text: string) {
    return Promise.resolve(text + 'B');
  }
}
