import { TestBed, inject } from '@angular/core/testing';

import { OrganizationMacroprocessService } from './organization-macroprocess.service';

describe('OrganizationMacroprocessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationMacroprocessService]
    });
  });

  it('should be created', inject([OrganizationMacroprocessService], (service: OrganizationMacroprocessService) => {
    expect(service).toBeTruthy();
  }));
});
