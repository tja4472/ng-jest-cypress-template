import { TestBed } from '@angular/core/testing';

import { ServiceAService } from './service-a.service';

describe('ServiceAService', () => {
  let service: ServiceAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
