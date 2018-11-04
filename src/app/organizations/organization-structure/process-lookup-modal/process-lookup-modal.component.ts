import { Component, OnInit, EventEmitter } from '@angular/core';
import { OrganizationProcess } from '../../organization/organization';

@Component({
  selector: 'app-process-lookup-modal',
  templateUrl: './process-lookup-modal.component.html',
  styleUrls: ['./process-lookup-modal.component.scss']
})
export class ProcessLookupModalComponent implements OnInit {

  processes: OrganizationProcess[];
  selectedProcess: OrganizationProcess;
  confirmed = new EventEmitter<OrganizationProcess>();

  constructor() { }

  ngOnInit() {
    this.loadProcesses();
  }

  confirm() {
    this.confirmed.emit(this.selectedProcess);
  }

  private loadProcesses() {
    this.processes = []
  }
}
