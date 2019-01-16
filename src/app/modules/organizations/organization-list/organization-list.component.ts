import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

import { Organization } from '../organization';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { Paging } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  loading: boolean;
  paging: Paging = new Paging();
  organizations: Organization[];
  
  constructor(
    private modalService: BsModalService,
    private organizationService: OrganizationService
  ) {
    
  }

  ngOnInit() {
    this.listOrganizations();
  }

  addOrganization() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationModalComponent, {
      class: "modal-md",
      initialState: {}
    });

    // Act on confirmation
    modalRef.content.saved.subscribe(eventData => {
      this.listOrganizations(this.paging.currentPage);
      modalRef.hide();
    });
  }

  listOrganizations(page: number = 1) {
    this.organizations = null;
    this.loading = true;

    this.organizationService.listOrganizations(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.organizations = response['data'];
          this.paging = Object.assign(this.paging, response['paging']);
        },
        err => {
          console.error(err);
        }
      );
  }
  
  getPrevPage() {
    this.listOrganizations(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.listOrganizations(this.paging.currentPage + 1);
  }

}
