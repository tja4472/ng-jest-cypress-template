// service-to-test.ts
import { inject, Injectable } from '@angular/core';

import { ServiceToInject } from './service-to-inject';

@Injectable()
export class ServiceToTest {
  //
  serviceToInject = inject(ServiceToInject);

  public methodToTest() {
    return this.serviceToInject.method_1('6');
  }
}
