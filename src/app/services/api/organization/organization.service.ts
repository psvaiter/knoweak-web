import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Injectable()
export class OrganizationService {

  constructor(private crudService: CrudService) { }

  getById(organizationId: number) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}`;
    return this.crudService.get(url);
  }

}
