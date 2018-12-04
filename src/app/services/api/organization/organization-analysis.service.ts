import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationAnalysisService {

  constructor(private crudService: CrudService) { 

  }

  createAnalysis(organizationId: number, data: { description: string, scopes?: any }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/analyses`;
    return this.crudService.post(url, data);
  }

  patchAnalysis(organizationId: number, analysisId:number, data: { description: string }) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/analyses/${analysisId}`;
    return this.crudService.patch(url, data);
  }

}
