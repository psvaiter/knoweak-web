import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { Constants } from '../../../../shared/constants';
import { OrganizationMacroprocess, OrganizationProcess } from '../../organization';
import { CatalogProcessService } from '../../../../services/api/catalog/process/catalog-process.service';
import { OrganizationProcessService } from '../../../../services/api/organization/organization-process.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-process-lookup-modal',
  templateUrl: './process-lookup-modal.component.html',
  styleUrls: ['./process-lookup-modal.component.scss']
})
export class ProcessLookupModalComponent implements OnInit {

  @Input() organizationId: number;
  @Input() macroprocess: OrganizationMacroprocess;
  @Input() selectedProcess: OrganizationProcess;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @Output() edited: EventEmitter<OrganizationProcess> = new EventEmitter<OrganizationProcess>();
  
  editMode: boolean;
  processes: any[];
  selectedProcessId: number;
  ratingLevels = Constants.RATING_LEVELS;
  selectedRelevanceId: number;
  errors: any[];

  constructor(
    private catalogProcessService: CatalogProcessService,
    private organizationProcessService: OrganizationProcessService
  ) {

  }

  ngOnInit() {
    if (this.selectedProcess) {
      this.selectedProcessId = this.selectedProcess.id;
      this.selectedRelevanceId = (this.selectedProcess.relevance) ? this.selectedProcess.relevance.id : null;
      this.editMode = true;
    }
    this.loadProcesses();
  }

  confirm() {
    this.errors = null;

    if (this.editMode) {
      this.patchProcess(this.selectedRelevanceId);
    }
    else {
      this.addProcess(this.selectedProcessId, this.selectedRelevanceId);
    }
  }

  private loadProcesses() {
    this.catalogProcessService.listProcesses(1, 100).subscribe(
      response => {
        let processes = response['data'];
        this.processes = _.orderBy(processes, ['name']);
      }
    );
  }

  private addProcess(processId: number, relevanceLevelId: number) {
    let request = {
      macroprocessInstanceId: this.macroprocess.instanceId,
      processId: processId,
      relevanceLevelId: relevanceLevelId
    };

    this.organizationProcessService.addProcess(this.organizationId, request)
      .subscribe(
        response => {
          this.added.emit();
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

  private patchProcess(relevanceLevelId: number) {
    let request = {
      relevanceLevelId: relevanceLevelId 
    };
    
    this.organizationProcessService.patchProcess(this.organizationId, this.selectedProcess.instanceId, request)
      .subscribe(
        response => {
          this.selectedProcess.relevance = Constants.RATING_LEVELS.find(level => level.id == relevanceLevelId);
          this.edited.emit(this.selectedProcess);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
    );
  }

}
