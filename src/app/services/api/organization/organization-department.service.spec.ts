import { TestBed, inject } from '@angular/core/testing';

import { OrganizationDepartmentService } from './organization-department.service';

describe('OrganizationDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationDepartmentService]
    });
  });

  it('should be created', inject([OrganizationDepartmentService], (service: OrganizationDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
