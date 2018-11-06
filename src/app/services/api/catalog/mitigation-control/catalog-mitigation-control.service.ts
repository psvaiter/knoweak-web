import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { AddCatalogMitigationControlRequest, PatchCatalogMitigationControlRequest } from './catalog-mitigation-control';

@Injectable()
export class CatalogMitigationControlService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/mitigationControls`;
  }

  /**
   * Gets a single mitigation control by id from catalog.
   * @param mitigationControlId The id of the mitigation control to retrieve.
   */
  getMitigationControlById(mitigationControlId: number) {
    return this.crudService.get(`${this.url}/${mitigationControlId}`);
  }

  /**
   * Lists mitigation controls available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listMitigationControls(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a mitigation control to catalog.
   * @param data The mitigation control data.
   */
  addMitigationControl(data: AddCatalogMitigationControlRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates mitigation control with informed data.
   * @param data The data to patch.
   */
  patchMitigationControl(data: PatchCatalogMitigationControlRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a mitigation control from catalog.
   * @param mitigationControlId The id of the mitigation control to remove.
   */
  removeMitigationControl(mitigationControlId: number) {
    return this.crudService.delete(`${this.url}/${mitigationControlId}`);
  }

}
