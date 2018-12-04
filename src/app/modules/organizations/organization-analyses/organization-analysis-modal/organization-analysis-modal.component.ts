import { Component, OnInit, EventEmitter } from '@angular/core';
import { Analysis } from '../analysis';
import { OrganizationAnalysisService } from '../../../../services/api/organization/organization-analysis.service';
import { Organization } from '../../organization';
import { Observable } from 'rxjs/Observable';

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
    let action: Observable<Object>;
    this.sanitizeData();

    let request = { description: this.analysis.description };
    if (this.editMode) {
      action = this.organizationAnalysisService.patchAnalysis(this.organization.id, this.analysis.id, request);
    }
    else {
      action = this.organizationAnalysisService.createAnalysis(this.organization.id, request);
    }

    action.subscribe(
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
