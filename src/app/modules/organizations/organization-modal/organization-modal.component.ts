import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Organization } from '../organization';
import { OrganizationService, OrganizationPatchRequest } from '../../../services/api/organization/organization.service';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {

  persistedOrganization: Organization;
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
      this.persistedOrganization = Object.assign({}, this.organization);
    }
  }

  enableSave(): boolean {
    if (!this.organization.taxId || !this.organization.taxId.trim()) {
      return false;
    }
    if (!this.organization.legalName || !this.organization.legalName.trim()) {
      return false;
    }
    if (this.editMode) {
      return this.hasChangedData();
    }
    return true;
  }

  save() {
    let action: Observable<Object>;
    this.sanitizeData();

    if (this.editMode) {
      let patchData = this.getChanges(this.persistedOrganization, this.organization);
      action = this.organizationService.patchOrganization(this.organization.id, patchData);
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

  hasChangedData(): any {
    return JSON.stringify(this.persistedOrganization) != JSON.stringify(this.organization);
  }

  private sanitizeData() {
    this.organization.taxId = this.organization.taxId.trim();
    this.organization.legalName = this.organization.legalName.trim();
    this.organization.tradeName = (this.organization.tradeName) ? this.organization.tradeName.trim() : null;
  }

  private getChanges(oldData: any, newData: any): any {
    
    if (typeof oldData !== "object" || typeof newData !== "object") {
      return null;
    }

    let result: any = {};
    for (const key in newData) {

      let value = newData[key];
      if (value != oldData[key]) {
        if (typeof value === "string" && !value) {
          // Set null when value is an empty string
          result[key] = null;
        }
        else {
          // Copy value if changed
          result[key] = value;
        }
      }
    }

    return result;
  }

}
