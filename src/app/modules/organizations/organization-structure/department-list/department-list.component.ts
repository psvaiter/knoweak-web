import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationDepartment, OrganizationMacroprocess } from '../../organization/organization';
import { DepartmentsLookupModalComponent } from '../departments-lookup-modal/departments-lookup-modal.component';
import { MacroprocessLookupModalComponent } from '../macroprocess-lookup-modal/macroprocess-lookup-modal.component';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { CatalogDepartmentService } from '../../../../services/api/catalog/department/catalog-department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  
  @Input() organizationId: number;
  departments: OrganizationDepartment[];
  macroprocesses: OrganizationMacroprocess[];

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
    private catalogDepartmentSerivec: CatalogDepartmentService
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

  openAddMacroprocess(department: OrganizationDepartment): void {
    let modalRef = this.modalService.show(MacroprocessLookupModalComponent, {
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
    this.getDepartmentMacroprocesses(department);
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

  private addMacroprocess(department: OrganizationDepartment): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses`;

      this.crudService
        .post(url, { 
          departmentId: department.id,
          macroprocessId: department.selectedMacroprocessId 
        })
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
        let data = response['data'].filter(item => item.department.id == department.id);
        
        this.macroprocesses = data.map(item => {
          let macroprocess: OrganizationMacroprocess;
          macroprocess = item.macroprocess;
          macroprocess.instanceId = item.instanceId;
          macroprocess.department = department;
          macroprocess.organizationId = this.organizationId;
          return macroprocess;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  removeMacroprocess(macroprocess: OrganizationMacroprocess) {
    console.log("Removing...", macroprocess);
    if (!confirm(`Deseja remover o macroprocesso "${macroprocess.name}" do departamento "${macroprocess.department.name}"?`)) {
      return;
    }

    // TODO: Replace the simulation below by actual delete
    let indexToRemove = this.macroprocesses.findIndex(item => item.instanceId == macroprocess.instanceId);
    this.macroprocesses.splice(indexToRemove, 1);
  }
}
