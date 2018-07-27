import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudComponent } from '../../utils/crud/crud.component';
import { Analysis, AnalysisDeatil } from '../analysis';
import { CrudService } from '../../utils/crud/crud.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent extends CrudComponent<Analysis> implements OnInit {

  analysisId: number;
  organizationId: number;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute
  ) { 
    super(crudService);
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get("id");
      this.analysisId = +params.get("analysisId");
      this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses/${this.analysisId}`;
    });
  }

  ngOnInit() {
    this.getSingleRecord(this.url);
  }

}
