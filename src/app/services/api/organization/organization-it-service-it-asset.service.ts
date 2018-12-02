import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationItServiceItAssetService {

  constructor(private crudService: CrudService) { 
    
  }

  getItAssetByInstanceId(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.get(url);
  }

  listItAssets(organizationId: number, itServiceInstanceId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  addItAsset(organizationId: number, itServiceInstanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets`;
    return this.crudService.post(url, data);
  }

  patchItAsset(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.patch(url, data);
  }

  removeItAsset(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.delete(url);
  }

}
