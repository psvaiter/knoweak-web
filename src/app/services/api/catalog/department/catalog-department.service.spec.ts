import { TestBed, inject } from '@angular/core/testing';

import { CatalogDepartmentService } from './catalog-department.service';

describe('CatalogDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogDepartmentService]
    });
  });

  it('should be created', inject([CatalogDepartmentService], (service: CatalogDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
