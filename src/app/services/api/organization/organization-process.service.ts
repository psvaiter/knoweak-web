import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationProcessService {

  constructor(private crudService: CrudService) {

  }

  getById(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes/${instanceId}`;
    return this.crudService.get(url);
  }

  list(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  add(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes`;
    return this.crudService.post(data, url);
  }

  remove(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes/${instanceId}`;
    return this.crudService.delete(url);
  }
}
