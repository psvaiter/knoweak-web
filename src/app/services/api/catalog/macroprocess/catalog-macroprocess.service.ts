import { Injectable } from '@angular/core';
import { AddCatalogMacroprocessRequest, PatchCatalogMacroprocessRequest } from './catalog-macroprocess';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Injectable()
export class CatalogMacroprocessService {

  private url: string;

  constructor(private crudService: CrudService) {
    this.url = `${CrudService.BaseUrl}/macroprocesses`;
  }

  /**
   * Gets a single macroprocess by id from catalog.
   * @param macroprocessId The id of the macroprocess to retrieve.
   */
  getMacroprocessById(macroprocessId: number) {
    return this.crudService.get(`${this.url}/${macroprocessId}`);
  }

  /**
   * Lists macroprocesses available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listMacroprocesses(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a macroprocess to catalog.
   * @param data The macroprocess data.
   */
  addMacroprocess(data: AddCatalogMacroprocessRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates macroprocess with informed data.
   * @param data The data to patch.
   */
  patchMacroprocess(data: PatchCatalogMacroprocessRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a macroprocess from catalog.
   * @param macroprocessId The id of the macroprocess to remove.
   */
  removeMacroprocess(macroprocessId: number) {
    return this.crudService.delete(`${this.url}/${macroprocessId}`);
  }

}
