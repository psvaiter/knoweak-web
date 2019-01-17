import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth/auth.service';
import { Analysis } from './analysis';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { OrganizationAnalysisModalComponent } from './organization-analysis-modal/organization-analysis-modal.component';
import { Organization } from '../organization';
import { OrganizationAnalysisService } from '../../../services/api/organization/organization-analysis.service';

@Component({
  selector: 'app-organization-analyses',
  templateUrl: './organization-analyses.component.html',
  styleUrls: ['./organization-analyses.component.scss']
})
export class OrganizationAnalysesComponent extends CrudComponent<Analysis> implements OnInit {

  organizationId: number;
  organization: Organization;
  canCreate: boolean;
  canDelete: boolean;
  
  constructor(
    protected crudService: CrudService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private modalService: BsModalService,
    private organizationAnalysisService: OrganizationAnalysisService
  ) {
    super(crudService);
    route.params.subscribe(params => {
      this.organizationId = params['id'];
      this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses`;
    });
  }

  ngOnInit() {
    this.canCreate = this.auth.userHasScopes(['create:analyses']);
    this.canDelete = this.auth.userHasScopes(['delete:analyses']);
    // Get the organization legal name
    this._crudService
      .get(`${CrudService.BaseUrl}/organizations/${this.organizationId}`)
      .subscribe(
        data => {
          this.organization = data['data'];
        },
        err => {
          console.log(err);
        }
      );
    
    // List analyses
    this.getRecords(1);
  }

  addAnalysis() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationAnalysisModalComponent, {
      class: "modal-md",
      initialState: {
        organization: this.organization
      }
    });

    // Act on confirmation
    modalRef.content.saved.subscribe(eventData => {
      this.getRecords(this.paging.currentPage);
      modalRef.hide();
    });
  }

  deleteAnalysis(analysis: Analysis) {
    if (!confirm(`Tem certeza que deseja remover a análise ${analysis.id}?`)) {
      return;
    }
    this.organizationAnalysisService.deleteAnalysis(this.organization.id, analysis.id).subscribe(
      response => {
        this.getRecords(this.paging.currentPage);
      },
      err => {
        console.error(err);
      }
    );
  }

}
