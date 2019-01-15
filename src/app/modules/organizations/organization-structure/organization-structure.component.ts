import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

import { Organization } from '../organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})
export class OrganizationStructureComponent implements OnInit {

  loading: boolean;
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
    this.loading = true;
    this.organizationService.getById(this.organization.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        data => {
          this.organization = data['data'];
        },
        err => {
          console.error(err);
        }
      );
  }

}