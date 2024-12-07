// service-to-inject.ts
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceToInject {
  //
  property_1 = 10;

  public method_1(arg: string) {
    return 'method1-' + arg;
  }

  public method_2(arg: string) {
    return 'method2-' + arg;
  }
}
