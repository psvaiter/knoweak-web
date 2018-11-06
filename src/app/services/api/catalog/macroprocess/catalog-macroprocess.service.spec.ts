import { TestBed, inject } from '@angular/core/testing';

import { CatalogMacroprocessService } from './catalog-macroprocess.service';

describe('CatalogMacroprocessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogMacroprocessService]
    });
  });

  it('should be created', inject([CatalogMacroprocessService], (service: CatalogMacroprocessService) => {
    expect(service).toBeTruthy();
  }));
});
