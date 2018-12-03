import { Component, OnInit, EventEmitter } from '@angular/core';
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

  constructor(
    private organizationService: OrganizationService
  ) { 

  }

  ngOnInit() {
    
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
    this.sanitizeData();
    this.organizationService.addOrganization(this.organization).subscribe(
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
