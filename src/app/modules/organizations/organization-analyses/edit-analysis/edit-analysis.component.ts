import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Organization } from '../../organization';
import { Analysis } from '../analysis';
import { OrganizationAnalysisModalComponent } from '../organization-analysis-modal/organization-analysis-modal.component';
import { OrganizationService } from '../../../../services/api/organization/organization.service';
import { OrganizationAnalysisService } from '../../../../services/api/organization/organization-analysis.service';

@Component({
  selector: 'app-edit-analysis',
  templateUrl: './edit-analysis.component.html',
  styleUrls: ['./edit-analysis.component.scss']
})
export class EditAnalysisComponent implements OnInit {

  organization: Organization;
  analysis: Analysis;

  private organizationId: number;
  private analysisId: number;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationAnalysisService: OrganizationAnalysisService
  ) {

    // Read route params and build url
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get("id");
      this.analysisId = +params.get("analysisId");
    });
  }

  ngOnInit() {
    this.getOrganizationData();
    this.getAnalysisData();
  }

  editAnalysis() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationAnalysisModalComponent, {
      class: "modal-md",
      initialState: {
        organization: this.organization,
        analysis: this.analysis
      }
    });

    // Act on confirmation
    modalRef.content.saved.subscribe(eventData => {
      modalRef.hide();
    });
  }

  private getOrganizationData() {
    this.organizationService.getById(this.organizationId).subscribe(
      response => {
        this.organization = response['data'];
      }
    );
  }

  private getAnalysisData() {
    this.organizationAnalysisService.getAnalysisById(this.organizationId, this.analysisId).subscribe(
      response => {
        this.analysis = response['data'];
      }
    );
  }

}
