import { TestBed, inject } from '@angular/core/testing';

import { OrganizationItServiceService } from './organization-it-service.service';

describe('OrganizationItServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationItServiceService]
    });
  });

  it('should be created', inject([OrganizationItServiceService], (service: OrganizationItServiceService) => {
    expect(service).toBeTruthy();
  }));
});
