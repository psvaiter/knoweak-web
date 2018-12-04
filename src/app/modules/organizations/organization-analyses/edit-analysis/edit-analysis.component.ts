import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Analysis } from '../analysis';
import { CrudComponent } from '../../../../shared/components/crud/crud.component';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-edit-analysis',
  templateUrl: './edit-analysis.component.html',
  styleUrls: ['./edit-analysis.component.scss']
})
export class EditAnalysisComponent extends CrudComponent<Analysis> implements OnInit {

  analysisId: number;
  organizationId: number;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute
  ) { 
    super(crudService);

    // Read route params and build url
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get("id");
      this.analysisId = +params.get("analysisId");
      this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses/${this.analysisId}`;
    });
  }

  ngOnInit() {
    this.getSingleRecord(this.url);
  }

  patchRecord() {
    super.patchRecord(this.url);
  }

  editAnalysis() {

  }

}
