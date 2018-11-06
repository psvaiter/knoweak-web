import { TestBed, inject } from '@angular/core/testing';

import { CatalogMitigationControlService } from './catalog-mitigation-control.service';

describe('CatalogMitigationControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogMitigationControlService]
    });
  });

  it('should be created', inject([CatalogMitigationControlService], (service: CatalogMitigationControlService) => {
    expect(service).toBeTruthy();
  }));
});
