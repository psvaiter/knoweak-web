import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationMacroprocessService {

  constructor(private crudService: CrudService) { }

  getById(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/macroprocesses/${instanceId}`;
    return this.crudService.get(url);
  }

  list(organizationId: number, page: number, recordsPerPage: number = 10, departmentId: number = null) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/macroprocesses`;
    let filters = (departmentId) ? { departmentId } : null;
    return this.crudService.getPage(url, page, recordsPerPage, filters);
  }

  add(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/macroprocesses`;
    return this.crudService.post(url, data);
  }

  remove(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/macroprocesses/${instanceId}`;
    return this.crudService.delete(url);
  }

}
