import { TestBed, inject } from '@angular/core/testing';

import { CatalogItServiceService } from './catalog-it-service.service';

describe('CatalogItServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogItServiceService]
    });
  });

  it('should be created', inject([CatalogItServiceService], (service: CatalogItServiceService) => {
    expect(service).toBeTruthy();
  }));
});
