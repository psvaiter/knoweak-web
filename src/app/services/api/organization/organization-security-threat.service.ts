import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationSecurityThreatService {

  constructor(private crudService: CrudService) { 

  }

  listSecurityThreats(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/securityThreats`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

}
