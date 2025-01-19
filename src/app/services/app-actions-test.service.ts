import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppActionsTestService {
  public property: string;

  constructor() {
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
