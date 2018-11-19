import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationItAssetService {

  constructor(private crudService: CrudService) {

  }

  getItAssetByInstanceId(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.get(url);
  }

  listItAssets(organizationId: number, itServiceInstanceId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}`;
    return this.crudService.getPage(url, page, recordsPerPage, { itServiceInstanceId });
  }

  addItAsset(organizationId: number, itServiceInstanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets`;
    return this.crudService.post(url, data);
  }

  removeItAsset(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.delete(url);
  }

}