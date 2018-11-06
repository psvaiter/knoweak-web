import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { AddCatalogProcessRequest, PatchCatalogProcessRequest } from './catalog-process';

@Injectable()
export class CatalogProcessService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/processes`;
  }

  /**
   * Gets a single process by id from catalog.
   * @param processId The id of the process to retrieve.
   */
  getProcessById(processId: number) {
    return this.crudService.get(`${this.url}/${processId}`);
  }

  /**
   * Lists processes available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listProcesses(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a process to catalog.
   * @param data The process data.
   */
  addProcess(data: AddCatalogProcessRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates process with informed data.
   * @param data The data to patch.
   */
  patchProcess(data: PatchCatalogProcessRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a process from catalog.
   * @param processId The id of the process to remove.
   */
  removeProcess(processId: number) {
    return this.crudService.delete(`${this.url}/${processId}`);
  }
  
}
