import { Component, OnInit } from '@angular/core';

import { Organization } from './organization';
import { CrudComponent } from '../../shared/crud/crud.component';
import { CrudService } from '../../shared/crud/crud.service';

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
