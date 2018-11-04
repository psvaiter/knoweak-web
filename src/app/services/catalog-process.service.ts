import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud/crud.service';

@Injectable()
export class CatalogProcessService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/processes`;
  }

  /**
   * Gets a single process by id from catalog.
   * @param processId The id of process to retrieve.
   */
  getById(processId: number) {
    return this.crudService.get(`${this.url}/${processId}`);
  }

  /**
   * Lists processes available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  list(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a process to catalog.
   * @param data The process data to be added.
   */
  add(data) {
    return this.crudService.post(data, this.url);
  }

  /**
   * Removes a process from catalog.
   * @param processId The id of process to remove.
   */
  remove(processId: number) {
    return this.crudService.delete(`${this.url}/${processId}`);
  }
}
