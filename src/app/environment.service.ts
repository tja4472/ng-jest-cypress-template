import { Injectable } from '@angular/core';

import { Environment } from '../environments/environment-types';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements Environment {
  get appCode() {
    return environment.appCode;
  }

  get production() {
    return environment.production;
  }

  constructor() {}
}
