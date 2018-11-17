import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationProcess, OrganizationItService } from '../../organization/organization';
import { ItServiceLookupModalComponent } from '../it-service-lookup-modal/it-service-lookup-modal.component';

@Component({
  selector: 'app-process-item',
  templateUrl: './process-item.component.html',
  styleUrls: ['./process-item.component.scss']
})
export class ProcessItemComponent implements OnInit {

  @Input() process: OrganizationProcess;
  @Output() delete = new EventEmitter();
  
  expanded: boolean;
  organizationId: number;
  itServices: OrganizationItService[];

  constructor(
    private modalService: BsModalService
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

  addProcess() {
    // Open modal
    let modalRef = this.modalService.show(ItServiceLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        process: this.process
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      console.log(eventData);
      //this.requestAddItService(itService);
      modalRef.hide();
    });
  }

  removeItService(itService: OrganizationItService) {
    if (!confirm(`Deseja remover o serviço de TI "${itService.name}" do processo "${this.process.name}"?`)) {
      return;
    }

    // this.organizationItServiceService.remove(this.organizationId, this.process.instanceId).subscribe(
    //   response => {
    //     this.listMacroprocessProcesses();
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );
  }

  private listProcessItServices() {
    // this.organizationProcessService.list(this.organizationId, 1, 100).subscribe(
    //   response => {
    //     this.processes = response['data']
    //       .filter(item => item.macroprocessInstanceId == this.macroprocess.instanceId)
    //       .map(item => {
    //         let process = new OrganizationProcess();

    //         process.instanceId = item.instanceId;
    //         process.id = item.process.id;
    //         process.name = item.process.name;
    //         process.relevance = item.relevanceLevelId;

    //         process.organizationId = this.organizationId;
    //         process.macroprocess = this.macroprocess;

    //         return process;
    //       });

    //     this.processes.sort((a, b) => (a.name < b.name) ? -1 : 1);
    //   }
    // );
  }

  private requestAddItService(itService: OrganizationItService) {
    let request = {
      macroprocessInstanceId: this.process.instanceId,
      processId: itService.id,
      relevanceLevelId: itService.relevance
    };
    // this.organizationProcessService.add(this.organizationId, request).subscribe(
    //   response => {
    //     this.listProcessItServices();
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );
  }

}
