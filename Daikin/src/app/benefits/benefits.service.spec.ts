import { TestBed, inject } from '@angular/core/testing';

import { BenefitsService } from './benefits.service';

describe('BenefitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenefitsService]
    });
  });

  it('should be created', inject([BenefitsService], (service: BenefitsService) => {
    expect(service).toBeTruthy();
  }));
});
