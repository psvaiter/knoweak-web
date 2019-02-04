import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../services/auth/auth.service';
import { Analysis } from './analysis';
import { OrganizationAnalysisModalComponent } from './organization-analysis-modal/organization-analysis-modal.component';
import { Organization } from '../organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { OrganizationAnalysisService } from '../../../services/api/organization/organization-analysis.service';
import { Paging } from '../../../shared/components/pagination/pagination.component';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-organization-analyses',
  templateUrl: './organization-analyses.component.html',
  styleUrls: ['./organization-analyses.component.scss']
})
export class OrganizationAnalysesComponent implements OnInit {

  organizationId: number;
  organization: Organization;
  canCreate: boolean;
  canDelete: boolean;
  
  loading: boolean;
  paging: Paging = new Paging();
  records: any[];
  
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationAnalysisService: OrganizationAnalysisService
  ) {
    route.params.subscribe(params => {
      this.organizationId = params['id'];
    });
  }

  ngOnInit() {
    this.canCreate = this.auth.userHasScopes(['create:analyses']);
    this.canDelete = this.auth.userHasScopes(['delete:analyses']);
    
    this.getOrganization();
    this.listAnalyses(1);
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
      this.listAnalyses(this.paging.currentPage);
      modalRef.hide();
    });
  }

  deleteAnalysis(analysis: Analysis) {
    if (!confirm(`Tem certeza que deseja remover a análise ${analysis.id}?`)) {
      return;
    }
    this.organizationAnalysisService.deleteAnalysis(this.organization.id, analysis.id).subscribe(
      response => {
        this.listAnalyses(this.paging.currentPage);
      },
      err => {
        let messages = Utils.getErrors(err).map(e => e.message);
        alert(messages.join(" | "));
      }
    );
  }
  
  getPrevPage() {
    this.listAnalyses(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.listAnalyses(this.paging.currentPage + 1);
  }

  private getOrganization() {
    this.organizationService.getById(this.organizationId)
      .subscribe(
        response => {
          this.organization = response['data'];
        },
        err => {
          console.error(err);
        }
     );
  }

  private listAnalyses(page: number) {
    this.loading = true;
    this.records = [];

    this.organizationAnalysisService.listAnalyses(this.organizationId, page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.records = response['data'];
          this.paging = response['paging'];
        },
        err => {
          console.error(err);
        }
      );
  }

}
