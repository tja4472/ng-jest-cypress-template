import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  public property: string;

  constructor() {
    if (window.Cypress) {
      window.TestService = this;
    }

    this.property = 'testServiceProperty';
  }

  method1(text: string): string {
    const result = text + 'A';
    this.property = result;
    return result;
  }

  promise1(text: string) {
    return Promise.resolve(text + 'B');
  }
  //void
}
