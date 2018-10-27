import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment, OrganizationMacroprocess } from '../../organization/organization';
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
      response => {
        this.departments = response['data'].map(item => item.department);
      },
      err => {
        console.error(err);
      }
    );
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
      class: 'modal-md',
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
      class: 'modal-md',
      initialState: {
        department
      }
    });

    modalRef.content.confirmed.subscribe(department => {
      this.addMacroprocess(department)
        .then(() => {
          modalRef.hide();
        });
    });
  }

  toggleDepartmentMacroprocesses(department: OrganizationDepartment) {
    department.expanded = !department.expanded; 
    if (!department.expanded) {
      return;
    }
    //this.getDepartmentMacroprocesses(department);
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

  private addMacroprocess(department: OrganizationDepartment): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses`;

      this.crudService
        .post({ 
          departmentId: department.id,
          macroprocessId: department.selectedMacroprocessId 
        }, url)
        .subscribe(
          data => {
            this.getDepartmentMacroprocesses(department);
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

  private getDepartmentMacroprocesses(department: OrganizationDepartment) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses`;

    this.crudService.getPage(url, 1, 100).subscribe(
      response => {
        let macroprocesses = response['data'].filter(item => item.department.id == department.id);
        let selectedDepartment = this.departments.find(dept => dept.id == department.id);
        console.log(selectedDepartment);
        selectedDepartment.macroprocesses = macroprocesses.map(item => {
          let macroprocess: OrganizationMacroprocess;
          macroprocess = item.macroprocess;
          macroprocess.instanceId = item.instanceId;
          return macroprocess;
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
