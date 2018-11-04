import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrganizationMacroprocess, OrganizationProcess } from '../../organization/organization';

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

  constructor() { }

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
    // open modal
  }

  removeProcess() {
    // react to child event
  }

  private listProcesses() {
    // get from API and store
  }
}
