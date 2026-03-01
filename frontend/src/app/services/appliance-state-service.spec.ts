import { TestBed } from '@angular/core/testing';

import { ApplianceStateService } from './appliance-state-service';

describe('ApplianceStateService', () => {
  let service: ApplianceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplianceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
