import { randomCode } from './randomCode';

export class ClassA {
  public createId() {
    return randomCode() + '-Q';
  }
}
