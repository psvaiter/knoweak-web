import { TestBed, inject } from '@angular/core/testing';

import { OrganizationItServiceItAssetService } from './organization-it-service-it-asset.service';

describe('OrganizationItServiceItAssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationItServiceItAssetService]
    });
  });

  it('should be created', inject([OrganizationItServiceItAssetService], (service: OrganizationItServiceItAssetService) => {
    expect(service).toBeTruthy();
  }));
});
