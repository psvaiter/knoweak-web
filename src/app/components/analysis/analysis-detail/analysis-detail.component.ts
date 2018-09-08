import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CrudComponent } from '../../../shared/crud/crud.component';
import { CrudService } from '../../../shared/crud/crud.service';
import { Analysis, AnalysisDeatil } from '../analysis';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent extends CrudComponent<AnalysisDeatil> implements OnInit {

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
