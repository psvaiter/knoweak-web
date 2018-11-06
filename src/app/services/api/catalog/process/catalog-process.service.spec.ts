import { TestBed, inject } from '@angular/core/testing';

import { CatalogProcessService } from './catalog-process.service';

describe('CatalogProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogProcessService]
    });
  });

  it('should be created', inject([CatalogProcessService], (service: CatalogProcessService) => {
    expect(service).toBeTruthy();
  }));
});
