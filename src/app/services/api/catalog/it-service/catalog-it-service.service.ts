import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { AddCatalogItServiceRequest, PatchCatalogItServiceRequest } from './catalog-it-service';

@Injectable()
export class CatalogItServiceService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/itServices`;
  }

  /**
   * Gets a single IT service by id from catalog.
   * @param itServiceId The id of the IT service to retrieve.
   */
  getItServiceById(itServiceId: number) {
    return this.crudService.get(`${this.url}/${itServiceId}`);
  }

  /**
   * Lists IT services available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listItServices(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a IT service to catalog.
   * @param data The IT service data.
   */
  addItService(data: AddCatalogItServiceRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates IT service with informed data.
   * @param data The data to patch.
   */
  patchItService(data: PatchCatalogItServiceRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a IT service from catalog.
   * @param itServiceId The id of the IT service to remove.
   */
  removeItService(itServiceId: number) {
    return this.crudService.delete(`${this.url}/${itServiceId}`);
  }

}
