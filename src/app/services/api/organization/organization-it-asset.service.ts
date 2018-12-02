import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationItAssetService {
  
  constructor(private crudService: CrudService) {

  }

  getItAssetByInstanceIdFromOrganization(organizationId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.get(url);
  }

  getItAssetByInstanceId(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.get(url);
  }

  listItAssetsFromOrganization(organizationId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  listItAssets(organizationId: number, itServiceInstanceId: number, page: number, recordsPerPage: number = 10) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets`;
    return this.crudService.getPage(url, page, recordsPerPage);
  }

  addItAssetToOrganization(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets`;
    return this.crudService.post(url, data);
  }

  patchItAsset(organizationId: number, itAssetInstanceId: number, data: { externalIdentifier: string; }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.patch(url, data);
  }

  addItAsset(organizationId: number, itServiceInstanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets`;
    return this.crudService.post(url, data);
  }

  patchItAssetFromItService(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.patch(url, data);
  }

  removeItAsset(organizationId: number, itServiceInstanceId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${itServiceInstanceId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.delete(url);
  }

  removeItAssetFromOrganization(organizationId: number, itAssetInstanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itAssets/${itAssetInstanceId}`;
    return this.crudService.delete(url);
  }

}
