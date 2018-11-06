import { Component, OnInit } from '@angular/core';

import { Organization } from './organization';
import { CrudService } from '../../shared/components/crud/crud.service';
import { CrudComponent } from '../../shared/components/crud/crud.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent extends CrudComponent<Organization> implements OnInit {
  
  url = CrudService.BaseUrl + '/organizations';
 
  ngOnInit() {
    this.getRecords(1);
  }

}
