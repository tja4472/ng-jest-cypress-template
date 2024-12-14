// service-to-test-auto.spec.ts
import { TestBed } from '@angular/core/testing';

import { describe, expect, it, jest } from '@jest/globals';

import { ServiceToInject } from './service-to-inject';
import { ServiceToTest } from './service-to-test';

jest.mock('./service-to-inject');

describe('Service Tests', () => {
  //
  it('typed using jest.mocked', () => {
    //
    const mockedServiceToInject = jest.mocked(new ServiceToInject());

    mockedServiceToInject.method_1.mockReturnValue('KKKK');

    TestBed.configureTestingModule({
      providers: [
        ServiceToTest,
        { provide: ServiceToInject, useValue: mockedServiceToInject },
      ],
    });

    const service = TestBed.inject(ServiceToTest);

    expect(service.methodToTest()).toBe('KKKK');
    expect(mockedServiceToInject.method_1).toHaveBeenCalledTimes(1);
  });
});
