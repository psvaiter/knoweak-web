import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment, OrganizationMacroprocess } from '../../organization/organization';
import { OrganizationMacroprocessService } from '../../../../services/api/organization/organization-macroprocess.service';
import { MacroprocessLookupModalComponent } from '../macroprocess-lookup-modal/macroprocess-lookup-modal.component';

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent implements OnInit {

  @Input() department: OrganizationDepartment;
  @Output() delete: EventEmitter<OrganizationDepartment> = new EventEmitter();

  expanded: boolean = false;
  organizationId: number;
  macroprocesses: OrganizationMacroprocess[];

  constructor(
    private modalService: BsModalService,
    private organizationMacroprocessService: OrganizationMacroprocessService
  ) {

  }

  ngOnInit() {
    this.organizationId = this.department.organizationId;
  }

  toggleMacroprocesses(): void {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listDepartmentMacroprocesses();
  }

  deleteDepartment() {
    // Emit event asking for parent component to remove
    this.delete.emit(this.department);
  }

  addMacroprocess() {
    // Open modal
    let modalRef = this.modalService.show(MacroprocessLookupModalComponent, {
      class: "modal-md",
      initialState: {
        department: this.department
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(macroprocess => {
      this.requestAddMacroprocess(macroprocess);
      modalRef.hide();
    });
  }

  removeMacroprocess(macroprocess: OrganizationMacroprocess) {
    if (!confirm(`Deseja remover o macroprocesso "${macroprocess.name}" do departamento "${this.department.name}"?`)) {
      return;
    }

    this.organizationMacroprocessService.remove(this.organizationId, macroprocess.instanceId).subscribe(
      response => {
        this.listDepartmentMacroprocesses();
      },
      error => {
        console.log(error);
      }
    );
  }

  private listDepartmentMacroprocesses() {
    this.organizationMacroprocessService.list(this.organizationId, 1).subscribe(
      response => {
        this.macroprocesses = response['data']
          .filter(item => item.department.id == this.department.id)
          .map(item => {
            let macroprocess = new OrganizationMacroprocess();
            
            macroprocess.instanceId = item.instanceId;
            macroprocess.id = item.macroprocess.id;
            macroprocess.name = item.macroprocess.name;

            macroprocess.department = this.department
            macroprocess.organizationId = this.organizationId;

            return macroprocess;
          });

        this.macroprocesses.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }

  private requestAddMacroprocess(macroprocess: any) {
    let request = {
      departmentId: this.department.id,
      macroprocessId: macroprocess.id
    };
    this.organizationMacroprocessService.add(this.organizationId, request).subscribe(success => {
      console.log(success);
      this.listDepartmentMacroprocesses();
    }, err => {
      console.log(err);
    });
  }

}
