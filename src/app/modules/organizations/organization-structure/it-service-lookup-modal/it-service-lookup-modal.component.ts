import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { Constants } from '../../../../shared/constants';
import { OrganizationProcess, OrganizationItService } from '../../organization';
import { CatalogItServiceService } from '../../../../services/api/catalog/it-service/catalog-it-service.service';
import { OrganizationItServiceService } from '../../../../services/api/organization/organization-it-service.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-it-service-lookup-modal',
  templateUrl: './it-service-lookup-modal.component.html',
  styleUrls: ['./it-service-lookup-modal.component.scss']
})
export class ItServiceLookupModalComponent implements OnInit {

  @Input() process: OrganizationProcess;
  @Input() selectedItService: OrganizationItService;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @Output() edited: EventEmitter<OrganizationItService> = new EventEmitter<OrganizationItService>();

  editMode: boolean;

  organizationId: number;
  itServices: any[];
  selectedItServiceId: number;
  ratingLevels = Constants.RATING_LEVELS;
  selectedRelevanceId: number;
  errors: any[];

  constructor(
    private catalogItServiceService: CatalogItServiceService,
    private organizationItServiceService: OrganizationItServiceService
  ) { 

  }

  ngOnInit() {
    if (this.selectedItService) {
      this.selectedItServiceId = this.selectedItService.id;
      this.selectedRelevanceId = (this.selectedItService.relevance) ? this.selectedItService.relevance.id : null;
      this.editMode = true;
    }
    this.organizationId = this.process.organizationId;
    this.loadItServices();
  }

  confirm() {
    this.errors = null;
    
    if (this.editMode) {
      this.patchItService(this.selectedRelevanceId);
    }
    else {
      this.addItService(this.selectedItServiceId, this. selectedRelevanceId);
    }
  }

  private loadItServices() {
    this.catalogItServiceService.listItServices(1, 100).subscribe(
      response => {
        let itServices = response['data'];
        this.itServices = _.orderBy(itServices, ['name']);
      }
    );
  }

  private addItService(itServiceId: number, relevanceLevelId: number) {
    let request = {
      processInstanceId: this.process.instanceId,
      itServiceId: itServiceId,
      relevanceLevelId: relevanceLevelId
    };

    this.organizationItServiceService.addItService(this.organizationId, request)
      .subscribe(
        response => {
          this.added.emit();
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

  private patchItService(relevanceLevelId: number) {
    let request = {
      relevanceLevelId: relevanceLevelId
    };

    this.organizationItServiceService.patchItService(this.organizationId, this.selectedItService.instanceId, request)
      .subscribe(
        response => {
          this.selectedItService.relevance = Constants.RATING_LEVELS.find(level => level.id == relevanceLevelId);
          this.edited.emit(this.selectedItService);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
    );
  }
  
}
