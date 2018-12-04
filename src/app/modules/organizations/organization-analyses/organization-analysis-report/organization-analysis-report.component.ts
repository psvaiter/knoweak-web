import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AnalysisDetail } from '../analysis';
import { CrudComponent } from '../../../../shared/components/crud/crud.component';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-organization-analysis-report',
  templateUrl: './organization-analysis-report.component.html',
  styleUrls: ['./organization-analysis-report.component.scss']
})
export class OrganizationAnalysisReportComponent extends CrudComponent<AnalysisDetail> implements OnInit {

  analysisId: number;
  organizationId: number;

  constructor(
    private crudService: CrudService,
    private location: Location,
    private route: ActivatedRoute
  ) { 
    super(crudService);

    // Read route params and build url
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get("id");
      this.analysisId = +params.get("analysisId");
      this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses/${this.analysisId}/details`;
    });
  }

  ngOnInit() {
    this.getRecords(1);
  }

}