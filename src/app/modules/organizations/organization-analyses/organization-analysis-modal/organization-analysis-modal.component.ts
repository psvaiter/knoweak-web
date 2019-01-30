import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';

import { Organization } from '../../organization';
import { Analysis } from '../analysis';
import { OrganizationAnalysisService } from '../../../../services/api/organization/organization-analysis.service';
import { OrganizationAnalysisScopeSelectionComponent } from '../organization-analysis-scope-selection/organization-analysis-scope-selection.component';

@Component({
  selector: 'app-organization-analysis-modal',
  templateUrl: './organization-analysis-modal.component.html',
  styleUrls: ['./organization-analysis-modal.component.scss']
})
export class OrganizationAnalysisModalComponent implements OnInit {

  organization: Organization;
  analysis: Analysis = new Analysis();
  editMode: boolean;
  scopeOption: string = "all";  // all | custom
  errors = [];

  @Output() saved = new EventEmitter();

  @ViewChild(OrganizationAnalysisScopeSelectionComponent)
  private scopeComponent: OrganizationAnalysisScopeSelectionComponent;

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
      let scopes = this.getSelectedScopes();  
      
      if (!scopes && this.scopeOption == "custom") {
        // Just make sure the user really wants to analyze everything
        alert("Escolha um escopo ou altere a opção para \"Organização inteira\".");
        return;
      }

      this.createAnalysis(scopes);
    }
  }

  private createAnalysis(scopes) {
    let request = { 
      description: this.analysis.description,
      scopes: scopes || null
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

  private updateAnalysis() {
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

  private sanitizeData() {
    this.analysis.description = (this.analysis.description) ? this.analysis.description.trim() : null;
  }

  private getSelectedScopes() {
    let selectedDepartments = this.scopeComponent.selectedDepartments;

    if (!selectedDepartments) {
      return null;
    }

    let scopes = selectedDepartments
      .filter(item => item != null)
      .map(item => { return { departmentId: item }; });

    return scopes || null;
  }

}
