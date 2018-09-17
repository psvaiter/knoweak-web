import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment } from '../../organization/organization';
import { CrudService } from '../../../shared/crud/crud.service';
import { DepartmentsLookupModalComponent } from '../departments-lookup-modal/departments-lookup-modal.component';
import { MacroprocessesLookupModalComponent } from '../macroprocesses-lookup-modal/macroprocesses-lookup-modal.component';

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
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getOrganizationDepartments();
  }

  getOrganizationDepartments() {
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/departments`;

    this.crudService.getPage(url, 1, 100).subscribe(
      data => {
        this.departments = data['data'].map(item => item.department);
      },
      err => {
        console.error(err);
      }
    );
  }

  private addDepartment(selectedDepartmentId): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/departments`;

      this.crudService.post({ id: selectedDepartmentId }, url).subscribe(
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

  deleteDepartment(department: OrganizationDepartment) {
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
      class: 'modal-md', // sm, lg
    });

    modalRef.content.confirmed.subscribe(departmentId => {
      this.addDepartment(departmentId)
        .then(() => {
          modalRef.hide();
        });
    });
  }

  openAddMacroprocess(department: OrganizationDepartment): void {
    let modalRef = this.modalService.show(MacroprocessesLookupModalComponent, {
      class: 'modal-md', // sm, lg
      initialState: {
        department
      }
    });

    modalRef.content.confirmed.subscribe(departmentId => {
      console.log("macroprocesso adicionado.");
      // this.addDepartment(departmentId)
      //   .then(() => {
      //     modalRef.hide();
      //   });
    });
  }

  toggleDepartmentMacroprocesses(department: OrganizationDepartment) {
    department.expanded = !department.expanded; 
    if (!department.expanded) {
      return;
    }
    //this.getDepartmentMacroprocesses(department);
  }
}
