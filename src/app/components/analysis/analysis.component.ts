import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';
import { Analysis } from './analysis';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent extends CrudComponent<Analysis> implements OnInit {

  organizationId: number;
  
  constructor(
    protected crudService: CrudService,
    private route: ActivatedRoute) {
      super(crudService);
      route.params.subscribe(params => {
        this.organizationId = params['id'];
        this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses`;
      });
  }

  ngOnInit() {
    this.getRecords(1);
  }

}
