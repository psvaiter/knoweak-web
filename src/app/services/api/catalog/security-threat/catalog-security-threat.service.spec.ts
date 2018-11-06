import { TestBed, inject } from '@angular/core/testing';

import { CatalogSecurityThreatService } from './catalog-security-threat.service';

describe('CatalogSecurityThreatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogSecurityThreatService]
    });
  });

  it('should be created', inject([CatalogSecurityThreatService], (service: CatalogSecurityThreatService) => {
    expect(service).toBeTruthy();
  }));
});
