import { TestBed, inject } from '@angular/core/testing';

import { OrganizationSecurityThreatService } from './organization-security-threat.service';

describe('OrganizationSecurityThreatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationSecurityThreatService]
    });
  });

  it('should be created', inject([OrganizationSecurityThreatService], (service: OrganizationSecurityThreatService) => {
    expect(service).toBeTruthy();
  }));
});
