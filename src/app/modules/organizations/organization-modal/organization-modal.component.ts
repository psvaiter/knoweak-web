import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Organization } from '../organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class OrganizationModalComponent implements OnInit {

  @Input() organization: Organization = new Organization();
  @Output() saved = new EventEmitter();

  errors: any[];
  editMode: boolean;
  editableOrganization: Organization;
  persistedOrganization: Organization;

  fieldLabels: Map<string, string> = new Map([
    ["taxId", "Nº de Registro"],
    ["legalName", "Nome Empresarial"],
    ["tradeName", "Nome Fantasia"]
  ]);

  constructor(
    private organizationService: OrganizationService
  ) {

  }

  ngOnInit() {
    this.editableOrganization = Object.assign({}, this.organization);

    if (this.organization.id) {
      this.editMode = true;
      this.persistedOrganization = Object.assign({}, this.organization);
    }
  }

  enableSave(): boolean {
    if (!this.editableOrganization.taxId || !this.editableOrganization.taxId.trim()) {
      return false;
    }
    if (!this.editableOrganization.legalName || !this.editableOrganization.legalName.trim()) {
      return false;
    }
    if (this.editMode) {
      return this.hasChangedData();
    }
    return true;
  }

  save() {
    this.errors = null;

    let action: Observable<Object>;
    this.sanitizeData();

    if (this.editMode) {
      let patchData = this.getChanges(this.persistedOrganization, this.editableOrganization);
      action = this.organizationService.patchOrganization(this.organization.id, patchData);
    }
    else {
      action = this.organizationService.addOrganization(this.editableOrganization);
    }

    action.subscribe(
      response => {
        this.saved.emit(response['data']);
      },
      err => {
        this.errors = Utils.getErrors(err, this.fieldLabels);
      }
    );
  }

  hasChangedData(): any {
    return JSON.stringify(this.persistedOrganization) != JSON.stringify(this.editableOrganization);
  }

  private sanitizeData() {
    this.editableOrganization.taxId = Utils.sanitizeText(this.editableOrganization.taxId);
    this.editableOrganization.legalName = Utils.sanitizeText(this.editableOrganization.legalName);
    this.editableOrganization.tradeName = Utils.sanitizeText(this.editableOrganization.tradeName);
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
