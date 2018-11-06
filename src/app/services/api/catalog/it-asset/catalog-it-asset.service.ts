import { Injectable } from '@angular/core';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { AddCatalogItAssetRequest, PatchCatalogItAssetRequest } from './catalog-it-asset';

@Injectable()
export class CatalogItAssetService {

  private url: string;

  constructor(private crudService: CrudService) { 
    this.url = `${CrudService.BaseUrl}/itAssets`;
  }

  /**
   * Gets a single IT asset by id from catalog.
   * @param itAssetId The id of the asset to retrieve.
   */
  getItAssetById(itAssetId: number) {
    return this.crudService.get(`${this.url}/${itAssetId}`);
  }

  /**
   * Lists IT assets available in catalog (page by page).
   * @param page Number of the desired page.
   * @param recordsPerPage Number of records per page to return.
   */
  listItAssets(page: number, recordsPerPage: number = 10) {
    return this.crudService.getPage(this.url, page, recordsPerPage);
  }

  /**
   * Adds a IT asset to catalog.
   * @param data The IT asset data.
   */
  addItAsset(data: AddCatalogItAssetRequest) {
    return this.crudService.post(this.url, data);
  }

  /**
   * Updates IT asset with informed data.
   * @param data The data to patch.
   */
  patchItAsset(data: PatchCatalogItAssetRequest) {
    return this.crudService.patch(this.url, data);
  }

  /**
   * Removes a IT asset from catalog.
   * @param itAssetId The id of the IT asset to remove.
   */
  removeItAsset(itAssetId: number) {
    return this.crudService.delete(`${this.url}/${itAssetId}`);
  }

}
