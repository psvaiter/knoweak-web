import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CrudComponent } from '../../../shared/crud/crud.component';
import { CrudService } from '../../../shared/crud/crud.service';
import { Analysis } from '../analysis';

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
    private location: Location,
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

  goBack(): void {
    this.location.back();
  }
}
