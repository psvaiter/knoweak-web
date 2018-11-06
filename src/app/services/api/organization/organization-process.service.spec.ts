import { TestBed, inject } from '@angular/core/testing';

import { OrganizationProcessService } from './organization-process.service';

describe('OrganizationProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationProcessService]
    });
  });

  it('should be created', inject([OrganizationProcessService], (service: OrganizationProcessService) => {
    expect(service).toBeTruthy();
  }));
});
