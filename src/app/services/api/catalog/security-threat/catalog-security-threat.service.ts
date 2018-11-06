import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { AddCatalogSecurityThreatRequest, PatchCatalogSecurityThreatRequest } from './catalog-security-threat';

@Injectable()
export class CatalogSecurityThreatService {

  private url: string;

  constructor(private crudService: CrudService) {
    this.url = `${CrudService.BaseUrl}/securityThreats`;
  }

  /**
   * Gets a single security threat by id from catalog.
   * @param securityThreatId The id of the macroprocess to retrieve.
   */
  getSecurityThreatById(securityThreatId: number) {
    return this.crudService.get(`${this.url}/${securityThreatId}`);
  }

  /**
   * Lists security threats available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listSecurityThreats(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a security threat to catalog.
   * @param data The security threat data.
   */
  addSecurityThreat(data: AddCatalogSecurityThreatRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates security threat with informed data.
   * @param data The data to patch.
   */
  patchSecurityThreat(data: PatchCatalogSecurityThreatRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a security threat from catalog.
   * @param securityThreatId The id of the security threat to remove.
   */
  removeSecurityThreat(securityThreatId: number) {
    return this.crudService.delete(`${this.url}/${securityThreatId}`);
  }

}
