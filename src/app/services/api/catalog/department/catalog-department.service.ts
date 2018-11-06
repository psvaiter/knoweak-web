import { Injectable } from '@angular/core';
import { AddCatalogDepartmentRequest, PatchCatalogDepartmentRequest } from './catalog-department';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Injectable()
export class CatalogDepartmentService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/departments`;
  }

  /**
   * Gets a single department by id from catalog.
   * @param departmentId The id of the department to retrieve.
   */
  getDepartmentById(departmentId: number) {
    return this.crudService.get(`${this.url}/${departmentId}`);
  }

  /**
   * Lists departments available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listDepartments(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a department to catalog.
   * @param data The department data.
   */
  addDepartment(data: AddCatalogDepartmentRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates department with informed data.
   * @param data The data to patch.
   */
  patchDepartment(data: PatchCatalogDepartmentRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a department from catalog.
   * @param departmentId The id of the department to remove.
   */
  removeDepartment(departmentId: number) {
    return this.crudService.delete(`${this.url}/${departmentId}`);
  }

}
