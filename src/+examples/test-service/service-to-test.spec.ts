// service-to-test.spec.ts
import { TestBed } from '@angular/core/testing';

import { describe, expect, it, jest } from '@jest/globals';

import { ServiceToInject } from './service-to-inject';
import { ServiceToTest } from './service-to-test';

describe('Service Tests', () => {
  //
  it('unmocked methodToTest should return `method1-6`', () => {
    //
    TestBed.configureTestingModule({
      providers: [ServiceToTest, ServiceToInject],
    });

    const service = TestBed.inject(ServiceToTest);

    expect(service.methodToTest()).toBe('method1-6');
  });

  it('untyped mock', () => {
    //
    const mockedServiceToInject = {
      method_1: jest.fn(), // << Not type safe
    };

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

  it('typed using jest.Mocked', () => {
    //
    const mockedServiceToInject: jest.Mocked<ServiceToInject> = {
      property_1: 4,
      method_1: jest.fn(),
      method_2: jest.fn(),
    };

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
