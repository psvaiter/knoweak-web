import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Organization } from '../organization/organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})
export class OrganizationStructureComponent implements OnInit {

  organization: Organization = new Organization();

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute
    ) {
    route.params.subscribe(params => this.organization.id = params['id']);
  }

  ngOnInit() {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getById(this.organization.id).subscribe(
      data => {
        this.organization = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

}