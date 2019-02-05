import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../services/auth/auth.service';
import { Organization } from '../organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {
  
  organizationId: number;
  organization: Organization;
  canUpdate: boolean;
  loading: boolean;

  constructor(
    private auth: AuthService,
    private organizationService: OrganizationService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(params => this.organizationId = params['id']);
  }

  ngOnInit() {
    this.getOrganization();
    this.canUpdate = this.auth.userHasScopes(['update:organizations']);
  }

  editOrganization() {
    let modalRef = this.modalService.show(OrganizationModalComponent, {
      class: "modal-md",
      initialState: {
        organization: this.organization
      }
    });

    modalRef.content.saved.subscribe(eventData => {
      this.getOrganization();
      modalRef.hide();
    });
  }

  private getOrganization() {
    this.loading = true;

    this.organizationService.getById(this.organizationId)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.organization = response['data'];
        },
        err => {
          console.error(err);
        }
      );
  }

}
