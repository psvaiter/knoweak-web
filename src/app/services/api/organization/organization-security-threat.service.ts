import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationSecurityThreatService {

  constructor(private crudService: CrudService) { 

  }

  addSecurityThreat(organizationId: number, data: { securityThreatId: number, threatLevelId: number }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/securityThreats`;
    return this.crudService.post(url, data);
  }

  listSecurityThreats(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/securityThreats`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  patchSecurityThreat(organizationId: number, securityThreatId: number, data: { threatLevelId: number }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/securityThreats/${securityThreatId}`;
    return this.crudService.patch(url, data);
  }

  removeSecurityThreat(organizationId: number, securityThreatId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/securityThreats/${securityThreatId}`;
    return this.crudService.delete(url);
  }

}
