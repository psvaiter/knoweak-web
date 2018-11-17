import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationMacroprocess, OrganizationProcess } from '../../organization/organization';
import { ProcessLookupModalComponent } from '../process-lookup-modal/process-lookup-modal.component';
import { OrganizationProcessService } from '../../../../services/api/organization/organization-process.service';

@Component({
  selector: 'app-macroprocess-item',
  templateUrl: './macroprocess-item.component.html',
  styleUrls: ['./macroprocess-item.component.scss']
})
export class MacroprocessItemComponent implements OnInit {

  @Input() macroprocess: OrganizationMacroprocess;
  @Output() delete = new EventEmitter();

  expanded: boolean;
  organizationId: number;
  processes: OrganizationProcess[];

  constructor(
    private modalService: BsModalService,
    private organizationProcessService: OrganizationProcessService
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
    modalRef.content.confirmed.subscribe(eventData => {
      let organizationProcess = new OrganizationProcess();
      organizationProcess.id = eventData.processId;
      organizationProcess.relevance = eventData.relevance;

      this.requestAddProcess(organizationProcess);
      modalRef.hide();
    });
  }

  removeProcess(process: OrganizationProcess) {
    if (!confirm(`Deseja remover o processo "${process.name}" do macroprocesso "${this.macroprocess.name}"?`)) {
      return;
    }

    this.organizationProcessService.remove(this.organizationId, this.macroprocess.instanceId).subscribe(
      response => {
        this.listMacroprocessProcesses();
      },
      err => {
        console.error(err);
      }
    );
  }

  private listMacroprocessProcesses() {
    this.organizationProcessService.list(this.organizationId, 1, 100).subscribe(
      response => {
        this.processes = response['data']
          .filter(item => item.macroprocessInstanceId == this.macroprocess.instanceId)
          .map(item => {
            let process = new OrganizationProcess();

            process.instanceId = item.instanceId;
            process.id = item.process.id;
            process.name = item.process.name;
            process.relevance = item.relevanceLevelId;

            process.organizationId = this.organizationId;
            process.macroprocess = this.macroprocess;

            return process;
          });

        this.processes.sort((a, b) => (a.name < b.name) ? -1 : 1);
      });
  }

  private requestAddProcess(process: OrganizationProcess) {
    let request = {
      macroprocessInstanceId: this.macroprocess.instanceId,
      processId: process.id,
      relevanceLevelId: process.relevance
    };
    this.organizationProcessService.add(this.organizationId, request).subscribe(
      response => {
        this.listMacroprocessProcesses();
      },
      err => {
        console.error(err);
      }
    );
  }

}
