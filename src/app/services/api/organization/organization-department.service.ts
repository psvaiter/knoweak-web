import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationDepartmentService {

  constructor(private crudService: CrudService) { 

  }

  getDepartmentById(organizationId: number, departmentId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/departments/${departmentId}`;
    return this.crudService.get(url);
  }

  listDepartments(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/departments`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  addDepartment(organizationId:number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/departments`;
    return this.crudService.post(url, data);
  }

  removeDepartment(organizationId: number, departmentId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/departments/${departmentId}`;
    return this.crudService.delete(url);
  }

}
