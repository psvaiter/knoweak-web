import { TestBed, inject } from '@angular/core/testing';

import { OrganizationItAssetService } from './organization-it-asset.service';

describe('OrganizationItAssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationItAssetService]
    });
  });

  it('should be created', inject([OrganizationItAssetService], (service: OrganizationItAssetService) => {
    expect(service).toBeTruthy();
  }));
});
