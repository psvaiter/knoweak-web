import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
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

  @Input() macroprocess: OrganizationMacroprocess;
  @Input() process: OrganizationProcess;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @Output() edited: EventEmitter<OrganizationProcess> = new EventEmitter<OrganizationProcess>();
  
  editMode: boolean;
  
  organizationId: number;
  processes: any[];
  selectedProcess: any;
  ratingLevels = Constants.RATING_LEVELS;
  selectedRelevanceId: number;

  loading: boolean;
  persisting: boolean;
  errors: any[];

  fieldLabels = new Map([
    ["macroprocessInstanceId", "Macroprocesso"],
    ["processId", "Processo"],
    ["name", "Processo"],
    ["macroprocessInstanceId/processId", "Macroprocesso + Processo"],
    ["relevanceLevelId", "Relevância"]
  ]);

  constructor(
    private catalogProcessService: CatalogProcessService,
    private organizationProcessService: OrganizationProcessService
  ) {

  }

  ngOnInit() {
    if (this.process) {
      this.selectedProcess = this.process;
      this.selectedRelevanceId = (this.process.relevance) ? this.process.relevance.id : null;
      this.editMode = true;
    }
    this.organizationId = this.macroprocess.organizationId;
    this.loadProcesses();
  }

  confirm() {
    this.errors = null;
    this.persisting = true;

    if (this.editMode) {
      this.patchProcess(this.selectedRelevanceId);
    }
    else {
      this.addToCatalogIfNotExist(this.selectedProcess)
        .then(process => this.addToOrganization(process, this.selectedRelevanceId))
        .then(() => this.added.emit())
        .catch(err => this.errors = Utils.getErrors(err, this.fieldLabels))
        .then(() => this.persisting = false);
    }
  }

  addNewOption(name: string) {
    return { name: name };
  }

  private loadProcesses() {
    this.loading = true;

    this.catalogProcessService.listProcesses(1, 100)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          let processes = response['data'];
          this.processes = _.orderBy(processes, ['name']);
        }
      );
  }

  private addToOrganization(process: any, relevanceLevelId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      let request = {
        macroprocessInstanceId: this.macroprocess.instanceId,
        processId: process.id,
        relevanceLevelId: relevanceLevelId
      };
  
      this.organizationProcessService.addProcess(this.organizationId, request)
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );

    });
  }

  private addToCatalogIfNotExist(process): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (this.isAlreadyInCatalog(process)) {
        return resolve(process);
      }

      this.catalogProcessService.addProcess({ name: process.name })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );

    });
  }

  private isAlreadyInCatalog(item) {
    return item && item.id;
  }

  private patchProcess(relevanceLevelId: number) {
    let request = {
      relevanceLevelId: relevanceLevelId 
    };
    
    this.organizationProcessService.patchProcess(this.organizationId, this.process.instanceId, request)
      .subscribe(
        response => {
          this.process.relevance = Constants.RATING_LEVELS.find(level => level.id == relevanceLevelId);
          this.edited.emit(this.process);
        },
        err => {
          this.errors = Utils.getErrors(err, this.fieldLabels);
        }
    );
  }

}
