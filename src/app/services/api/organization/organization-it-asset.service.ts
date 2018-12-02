import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationItAssetService {
  
  constructor(private crudService: CrudService) {

  }

  getItAssetByInstanceId(organizationId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.get(url);
  }

  listItAssets(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  addItAsset(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets`;
    return this.crudService.post(url, data);
  }

  patchItAsset(organizationId: number, itAssetInstanceId: number, data: { externalIdentifier: string; }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.patch(url, data);
  }

  removeItAsset(organizationId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.delete(url);
  }

}
