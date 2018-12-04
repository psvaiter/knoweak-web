import { TestBed, inject } from '@angular/core/testing';

import { OrganizationAnalysisService } from './organization-analysis.service';

describe('OrganizationAnalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationAnalysisService]
    });
  });

  it('should be created', inject([OrganizationAnalysisService], (service: OrganizationAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
