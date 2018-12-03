import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Organization } from '../organization';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent extends CrudComponent<Organization> implements OnInit {

  url = CrudService.BaseUrl + '/organizations';
  
  constructor(
    private crudService: CrudService,
    private modalService: BsModalService
  ) {
    super(crudService);
  }

  ngOnInit() {
    this.getRecords(1);
  }

  addOrganization() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationModalComponent, {
      class: "modal-md",
      initialState: {
        
      }
    });

    // Act on confirmation
    modalRef.content.saved.subscribe(eventData => {
      this.getRecords(this.paging.currentPage);
      modalRef.hide();
    });
  }

}
