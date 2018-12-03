import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { Organization } from '../../../modules/organizations/organization';

@Injectable()
export class OrganizationService {

  constructor(private crudService: CrudService) { }

  getById(organizationId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}`;
    return this.crudService.get(url);
  }

  addOrganization(data: Organization) {
    let url = `${CrudService.BaseUrl}/organizations`;
    return this.crudService.post(url, data);
  }

  patchOrganization(organizationId: number, data: Organization) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}`;
    return this.crudService.patch(url, data);
  }

}
