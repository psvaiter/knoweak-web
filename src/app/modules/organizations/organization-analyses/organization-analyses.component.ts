import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Analysis } from './analysis';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-organization-analyses',
  templateUrl: './organization-analyses.component.html',
  styleUrls: ['./organization-analyses.component.scss']
})
export class OrganizationAnalysesComponent extends CrudComponent<Analysis> implements OnInit {

  organizationId: number;
  organizationLegalName: string;
  
  constructor(
    protected crudService: CrudService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    super(crudService);
    route.params.subscribe(params => {
      this.organizationId = params['id'];
      this.url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/analyses`;
    });
  }

  ngOnInit() {
    // Get the organization legal name
    this._crudService
      .get(`${CrudService.BaseUrl}/organizations/${this.organizationId}`)
      .subscribe(
        data => {
          this.organizationLegalName = data['data']['legalName'];
        },
        err => {
          console.log(err);
        }
      );
    
    // List analyses
    this.getRecords(1);
  }

  addAnalysis() {
    // // Open modal
    // let modalRef = this.modalService.show(OrganizationAnalysisModalComponent, {
    //   class: "modal-md",
    //   initialState: {
        
    //   }
    // });

    // // Act on confirmation
    // modalRef.content.saved.subscribe(eventData => {
    //   modalRef.hide();
    // });
  }

}
