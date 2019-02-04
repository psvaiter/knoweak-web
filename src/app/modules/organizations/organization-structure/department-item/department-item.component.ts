import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';

import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment, OrganizationMacroprocess } from '../../organization';
import { OrganizationMacroprocessService } from '../../../../services/api/organization/organization-macroprocess.service';
import { MacroprocessLookupModalComponent } from '../macroprocess-lookup-modal/macroprocess-lookup-modal.component';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent implements OnInit {

  @Input() department: OrganizationDepartment;
  @Output() delete: EventEmitter<OrganizationDepartment> = new EventEmitter();

  expanded: boolean;
  loading: boolean;
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
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.department);
  }

  addMacroprocess() {
    // Open modal
    let modalRef = this.modalService.show(MacroprocessLookupModalComponent, {
      class: "modal-md",
      initialState: {
        organizationId: this.organizationId,
        department: this.department
      }
    });

    // Act on confirmation
    modalRef.content.added.subscribe(() => {
      this.listDepartmentMacroprocesses();
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
      err => {
        let messages = Utils.getErrors(err).map(e => e.message);
        alert(messages.join(" | "));
      }
    );
  }

  private listDepartmentMacroprocesses() {
    this.loading = true;
    this.organizationMacroprocessService.list(this.organizationId, 1, 100, this.department.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          let macroprocesses = response['data']
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

          this.macroprocesses = _.orderBy(macroprocesses, ['name']);
        }
      );
  }

}
