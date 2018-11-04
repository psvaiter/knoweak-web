import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationMacroprocess, OrganizationProcess } from '../../organization/organization';
import { ProcessLookupModalComponent } from '../process-lookup-modal/process-lookup-modal.component';

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

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
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
      modalRef.hide();
    });
  }

  removeProcess() {
    // react to child event
  }

  private listProcesses() {
    // get from API and store
  }
}
