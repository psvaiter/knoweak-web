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
  macroprocesses: OrganizationMacroprocess[];
  organizationId: number;

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
    this.delete.emit(this.department);
  }

  addMacroprocess() {
    let modalRef = this.modalService.show(MacroprocessLookupModalComponent, {
      class: "modal-md",
      initialState: {
        department: this.department
      }
    });

    modalRef.content.confirmed.subscribe(macroprocess => {
      console.log(macroprocess);
      
      let request = {
        departmentId: this.department.id,
        macroprocessId: macroprocess.id
      };
      this.organizationMacroprocessService.add(this.organizationId, request).subscribe(
        success => {
          console.log(success);
          this.listDepartmentMacroprocesses();
        },
        err => {
          console.log(err);
        }
      );

      modalRef.hide();
    });
  }

  removeMacroprocess() {
    
  }

  private listDepartmentMacroprocesses() {
    this.organizationMacroprocessService.list(this.organizationId, 1).subscribe(
      response => {
        this.macroprocesses = response['data'].filter(item => item.department.id == this.department.id);
        this.macroprocesses.sort((a, b) => (a.name < b.name) ? -1 : 1);
        console.log(this.macroprocesses);
      }
    );
  }

}
