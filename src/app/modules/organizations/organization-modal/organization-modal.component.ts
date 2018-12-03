import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Organization } from '../organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {

  organization: Organization = new Organization();
  saved = new EventEmitter();
  errors: any[];
  editMode: boolean;

  constructor(
    private organizationService: OrganizationService
  ) {

  }

  ngOnInit() {
    if (this.organization.id) {
      this.editMode = true;
    }
  }

  enableSave(): boolean {
    if (!this.organization.taxId || !this.organization.taxId.trim()) {
      return false;
    }
    if (!this.organization.legalName || !this.organization.legalName.trim()) {
      return false;
    }
    return true;
  }

  save() {
    let action: Observable<Object>;
    this.sanitizeData();

    if (this.editMode) {
      action = this.organizationService.patchOrganization(this.organization.id, this.organization);
    }
    else {
      action = this.organizationService.addOrganization(this.organization);
    }

    action.subscribe(
      response => {
        this.errors = [];
        this.saved.emit(response['data']);
      },
      err => {
        console.error(err);
        this.errors = err['error'].errors;
      }
    );
  }

  private sanitizeData() {
    this.organization.taxId = this.organization.taxId.trim();
    this.organization.legalName = this.organization.legalName.trim();
    this.organization.tradeName = (this.organization.tradeName) ? this.organization.tradeName.trim() : null;
  }

}
