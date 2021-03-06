import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationMacroprocess, OrganizationProcess, RatingLevel } from '../../organization';
import { ProcessLookupModalComponent } from '../process-lookup-modal/process-lookup-modal.component';
import { OrganizationProcessService } from '../../../../services/api/organization/organization-process.service';
import { Constants } from '../../../../shared/constants';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-macroprocess-item',
  templateUrl: './macroprocess-item.component.html',
  styleUrls: ['./macroprocess-item.component.scss']
})
export class MacroprocessItemComponent implements OnInit {

  @Input() macroprocess: OrganizationMacroprocess;
  @Output() delete = new EventEmitter();

  expanded: boolean;
  loading: boolean;
  organizationId: number;
  processes: OrganizationProcess[];

  constructor(
    private modalService: BsModalService,
    private organizationProcessService: OrganizationProcessService,
  ) {

  }

  ngOnInit() {
    this.organizationId = this.macroprocess.organizationId;
  }
  
  toggleProcesses() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listMacroprocessProcesses();
  }

  deleteMacroprocess() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.macroprocess);
  }

  addProcess() {
    // Open modal
    let modalRef = this.modalService.show(ProcessLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        macroprocess: this.macroprocess
      }
    });

    // Act on confirmation
    modalRef.content.added.subscribe(() => {
      this.listMacroprocessProcesses();
      modalRef.hide();
    });
  }

  removeProcess(process: OrganizationProcess) {
    if (!confirm(`Deseja remover o processo "${process.name}" do macroprocesso "${this.macroprocess.name}"?`)) {
      return;
    }

    this.organizationProcessService.removeProcess(this.organizationId, process.instanceId).subscribe(
      response => {
        this.listMacroprocessProcesses();
      },
      err => {
        let messages = Utils.getErrors(err).map(e => e.message);
        alert(messages.join(" | "));
      }
    );
  }

  private listMacroprocessProcesses() {
    this.loading = true;
    this.organizationProcessService.listProcesses(this.organizationId, 1, 100, this.macroprocess.instanceId)
      .pipe(finalize(() => this.loading= false))
      .subscribe(
        response => {
          let processes = response['data']
            .filter(item => item.macroprocessInstanceId == this.macroprocess.instanceId)
            .map(item => {
              let process = new OrganizationProcess();

              process.instanceId = item.instanceId;
              process.id = item.process.id;
              process.name = item.process.name;

              if (item.relevanceLevelId) {
                process.relevance = new RatingLevel();
                process.relevance.id = item.relevanceLevelId;
                process.relevance.name = Constants.RATING_LEVELS.find(level => level.id == item.relevanceLevelId).name;
              }

              process.organizationId = this.organizationId;
              process.macroprocess = this.macroprocess;

              return process;
            });

          this.processes = _.orderBy(processes, ['name']);
        }
      );
  }

}
