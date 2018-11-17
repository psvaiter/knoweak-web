import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment } from '../../organization/organization';
import { DepartmentsLookupModalComponent } from '../departments-lookup-modal/departments-lookup-modal.component';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  
  @Input() organizationId: number;

  departments: OrganizationDepartment[];

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
  ) { 

  }

  ngOnInit() {
    this.getOrganizationDepartments();
  }

  getOrganizationDepartments() {
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/departments`;

    this.crudService.getPage(url, 1, 100).subscribe(
      response => {
        this.departments = response['data'].map(item => {
          item.department.organizationId = this.organizationId;
          return item.department;
        });
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

    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/departments/${department.id}`;
    
    this.crudService.delete(url).subscribe(
      data => {
        this.getOrganizationDepartments();
      },
      err => {
        console.error(err);
      }
    );
  }

  openAddDepartment(): void {
    let modalRef = this.modalService.show(DepartmentsLookupModalComponent, {
      class: 'modal-md',
    });

    modalRef.content.confirmed.subscribe(departmentId => {
      this.addDepartment(departmentId)
        .then(() => {
          modalRef.hide();
        });
    });
  }

  private addDepartment(selectedDepartmentId): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/departments`;

      this.crudService.post(url, { id: selectedDepartmentId }).subscribe(
        data => {
          this.getOrganizationDepartments();
          resolve();
        },
        err => {
          console.error(err);
          reject(err);
        }
      );
    });

    return promise;
  }

}
