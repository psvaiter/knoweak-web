import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationProcessService {

  constructor(private crudService: CrudService) {

  }

  getProcessByInstanceId(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes/${instanceId}`;
    return this.crudService.get(url);
  }

  listProcesses(organizationId: number, page: number, recordsPerPage: number = 10, macroprocessInstanceId?: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes`;
    let filter = (macroprocessInstanceId) ? { macroprocessInstanceId } : null;
    return this.crudService.getPage(url, page, recordsPerPage, filter);
  }

  addProcess(organizationId: number, data) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes`;
    return this.crudService.post(url, data);
  }

  patchProcess(organizationId: number, instanceId: number, data: { relevanceLevelId: number }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes/${instanceId}`;
    return this.crudService.patch(url, data);
  }

  removeProcess(organizationId: number, instanceId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/processes/${instanceId}`;
    return this.crudService.delete(url);
  }

}
