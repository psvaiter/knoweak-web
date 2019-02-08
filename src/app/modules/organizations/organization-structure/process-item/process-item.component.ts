import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';

import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationProcess, OrganizationItService, RatingLevel } from '../../organization';
import { ProcessLookupModalComponent } from '../process-lookup-modal/process-lookup-modal.component';
import { ItServiceLookupModalComponent } from '../it-service-lookup-modal/it-service-lookup-modal.component';
import { OrganizationProcessService } from '../../../../services/api/organization/organization-process.service';
import { OrganizationItServiceService } from '../../../../services/api/organization/organization-it-service.service';
import { Constants } from '../../../../shared/constants';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-process-item',
  templateUrl: './process-item.component.html',
  styleUrls: ['./process-item.component.scss']
})
export class ProcessItemComponent implements OnInit {

  @Input() process: OrganizationProcess;
  @Output() edited = new EventEmitter();
  @Output() delete = new EventEmitter();
  
  expanded: boolean;
  loading: boolean;
  organizationId: number;
  itServices: OrganizationItService[];

  constructor(
    private modalService: BsModalService,
    private organizationProcessService: OrganizationProcessService,
    private organizationItServiceService: OrganizationItServiceService
  ) { 

  }

  ngOnInit() {
    this.organizationId = this.process.organizationId;
  }

  toggleItServices() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listProcessItServices();
  }

  deleteProcess() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.process);
  }

  editProcess() {
    // Open modal
    let modalRef = this.modalService.show(ProcessLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        macroprocess: this.process.macroprocess,
        process: this.process
      }
    });

    // Act on confirmation
    modalRef.content.edited.subscribe((editedProcess) => {
      this.process.relevance = editedProcess.relevance;
      modalRef.hide();
    });
  }

  addItService() {
    // Open modal
    let modalRef = this.modalService.show(ItServiceLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        process: this.process
      }
    });

    // Act on confirmation
    modalRef.content.added.subscribe(() => {
      this.listProcessItServices();
      modalRef.hide();
    });
  }

  removeItService(itService: OrganizationItService) {
    if (!confirm(`Deseja remover o serviço de TI "${itService.name}" do processo "${this.process.name}"?`)) {
      return;
    }

    this.organizationItServiceService.removeItService(this.organizationId, itService.instanceId).subscribe(
      response => {
        this.listProcessItServices();
      },
      err => {
        let messages = Utils.getErrors(err).map(e => e.message);
        alert(messages.join(" | "));
      }
    );
  }

  private listProcessItServices() {
    this.loading = true;
    this.organizationItServiceService.listItServices(this.organizationId, 1, 100, this.process.instanceId)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          let itServices = response['data']
            .filter(item => item.processInstanceId == this.process.instanceId)
            .map(item => {
              let itService = new OrganizationItService();

              itService.instanceId = item.instanceId;
              itService.id = item.itService.id;
              itService.name = item.itService.name;

              if (item.relevanceLevelId) {
                itService.relevance = new RatingLevel();
                itService.relevance.id = item.relevanceLevelId;
                itService.relevance.name = Constants.RATING_LEVELS.find(level => level.id == item.relevanceLevelId).name;
              }

              itService.organizationId = this.organizationId;
              itService.process = this.process;

              return itService;
            });

          this.itServices = _.orderBy(itServices, ['name']);
        }
      );
  }

}
