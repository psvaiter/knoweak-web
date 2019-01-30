import { Component, OnInit, EventEmitter } from '@angular/core';

import { Organization } from '../../organization';
import { Analysis } from '../analysis';
import { OrganizationAnalysisService } from '../../../../services/api/organization/organization-analysis.service';

@Component({
  selector: 'app-organization-analysis-modal',
  templateUrl: './organization-analysis-modal.component.html',
  styleUrls: ['./organization-analysis-modal.component.scss']
})
export class OrganizationAnalysisModalComponent implements OnInit {

  organization: Organization;
  analysis: Analysis = new Analysis();
  saved = new EventEmitter();
  editMode: boolean;
  scopeOption: string = "all";
  errors = [];

  constructor(
    private organizationAnalysisService: OrganizationAnalysisService
  ) { 

  }

  ngOnInit() {
    if (this.analysis.id) {
      this.editMode = true;
    }
  }

  save() {
    this.sanitizeData();

    if (this.editMode) {
      this.updateAnalysis();
    }
    else {
      this.createAnalysis();
    }
  }

  createAnalysis() {
    let request = { 
      description: this.analysis.description,
      //scopes: getSelectedScopes()
    };
    this.organizationAnalysisService.createAnalysis(this.organization.id, request)
      .subscribe(
        response => {
          this.saved.emit(this.analysis);
        },
        err => {
          console.error(err);
        }
      );
  }

  updateAnalysis() {
    let request = { 
      description: this.analysis.description 
    };

    this.organizationAnalysisService.patchAnalysis(this.organization.id, this.analysis.id, request)
      .subscribe(
        response => {
          this.saved.emit(this.analysis);
        },
        err => {
          console.error(err);
        }
      );
  }

  sanitizeData() {
    this.analysis.description = (this.analysis.description) ? this.analysis.description.trim() : null;
  }

}
