import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth/auth.service';
import { Organization } from '../organization';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent extends CrudComponent<Organization> implements OnInit {
  
  url = CrudService.BaseUrl + '/organizations';
  id: number;
  canUpdate: boolean;

  constructor(
    private auth: AuthService,
    protected _crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
  ) {
    super(_crudService);
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.getSingleRecord(this.url + `/${this.id}`);
    this.canUpdate = this.auth.userHasScopes(['update:organizations']);
  }

  editOrganization() {
    let modalRef = this.modalService.show(OrganizationModalComponent, {
      class: "modal-md",
      initialState: {
        organization: this.currentRecord 
      }
    });

    modalRef.content.saved.subscribe(eventData => {
      modalRef.hide();
    });
  }

}
