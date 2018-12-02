import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationItServiceService {

  constructor(private crudService: CrudService) { 

  }
  
  getItServiceByInstanceId(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${instanceId}`;
    return this.crudService.get(url);
  }

  listItServices(organizationId: number, page: number, recordsPerPage: number = 10, processInstanceId?: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices`;
    let filter = (processInstanceId) ? { processInstanceId } : null;
    return this.crudService.getPage(url, page, recordsPerPage, filter);
  }

  addItService(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices`;
    return this.crudService.post(url, data);
  }

  patchItService(organizationId: number, instanceId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${instanceId}`;
    return this.crudService.patch(url, data);
  }

  removeItService(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/itServices/${instanceId}`;
    return this.crudService.delete(url);
  }

}
