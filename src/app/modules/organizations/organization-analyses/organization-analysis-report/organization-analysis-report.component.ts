import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AnalysisDetail } from '../analysis';
import { Paging } from '../../../../shared/components/pagination/pagination.component';
import { OrganizationAnalysisService } from '../../../../services/api/organization/organization-analysis.service';

@Component({
  selector: 'app-organization-analysis-report',
  templateUrl: './organization-analysis-report.component.html',
  styleUrls: ['./organization-analysis-report.component.scss']
})
export class OrganizationAnalysisReportComponent implements OnInit {

  organizationId: number;
  analysisId: number;
  records: AnalysisDetail[];
  loading: boolean;
  paging: Paging = new Paging();
  showDetails: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private organizationAnalysisService: OrganizationAnalysisService
  ) { 
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get("id");
      this.analysisId = +params.get("analysisId");
    });
  }

  ngOnInit() {
    this.listAnalysisDetails(1);
  }

  private listAnalysisDetails(page: number) {
    this.loading = true;
    this.records = [];

    this.organizationAnalysisService.listAnalysisDetails(this.organizationId, this.analysisId, page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.records = response['data'];
          this.paging = Object.assign(this.paging, response['paging']);
        },
        err => {
          console.error(err);
        }
      );
  }

  getPrevPage() {
    this.listAnalysisDetails(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.listAnalysisDetails(this.paging.currentPage + 1);
  }

}
