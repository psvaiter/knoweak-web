import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

import { OrganizationDepartment } from '../../organization';
import { DepartmentsLookupModalComponent } from '../departments-lookup-modal/departments-lookup-modal.component';
import { OrganizationDepartmentService } from '../../../../services/api/organization/organization-department.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  
  @Input() organizationId: number;

  loading: boolean;
  departments: OrganizationDepartment[];

  constructor(
    private modalService: BsModalService,
    private organizationDepartmentService: OrganizationDepartmentService
  ) { 

  }

  ngOnInit() {
    this.getOrganizationDepartments();
  }

  getOrganizationDepartments() {
    this.loading = true;
    this.organizationDepartmentService.listDepartments(this.organizationId, 1, 100)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          let departments = response['data'].map(item => {
            item.department.organizationId = this.organizationId;
            return item.department;
          });

          this.departments = _.orderBy(departments, ['name']);
        },
        err => {
          console.error(err);
        }
      );
  }

  removeDepartment(department: OrganizationDepartment) {
    if (!confirm(`Deseja remover o departamento "${department.name}" da organização?`)) {
      return;
    }

    this.organizationDepartmentService.removeDepartment(this.organizationId, department.id).subscribe(
      data => {
        this.getOrganizationDepartments();
      },
      err => {
        let messages = Utils.getErrors(err).map(e => e.message);
        alert(messages.join(" | "));
      }
    );
  }

  openAddDepartment(): void {
    let modalRef = this.modalService.show(DepartmentsLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        organizationId: this.organizationId
      }
    });

    modalRef.content.added.subscribe(() => {
      this.getOrganizationDepartments();
      modalRef.hide();
    });
  }

}
