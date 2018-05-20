import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';
import { Organization } from './organization';

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
