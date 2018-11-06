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
  processes: OrganizationProcess[];
  organizationId: number;

  constructor(
    private modalService: BsModalService,
    private organizationProcessService: OrganizationProcessService
  ) {

  }

  ngOnInit() {
    this.organizationId = this.macroprocess.organizationId;
  }

  deleteMacroprocess() {
    // Emit event asking for parent component to remove
    this.delete.emit(this.macroprocess);
  }

  toggleProcesses() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listProcesses();
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
    modalRef.content.confirmed.subscribe(process => {
      console.log(process);
      modalRef.hide();
    });
  }

  removeProcess() {
    this.organizationProcessService.remove(this.organizationId, this.macroprocess.instanceId).subscribe(
      response => {
        this.listProcesses();
      }
    );
  }

  private listProcesses() {
    this.organizationProcessService.list(this.organizationId, 1).subscribe(
      response => {
        this.processes = response['data'].filter(item => item.macroprocessInstanceId == this.macroprocess.instanceId);
        this.processes.sort((a, b) => (a.name < b.name) ? -1 : 1);
      });
  }
}
