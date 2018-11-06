import { TestBed, inject } from '@angular/core/testing';

import { CatalogItAssetService } from './catalog-it-asset.service';

describe('CatalogItAssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogItAssetService]
    });
  });

  it('should be created', inject([CatalogItAssetService], (service: CatalogItAssetService) => {
    expect(service).toBeTruthy();
  }));
});
