import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../utils/crud/crud.service';
import { Organization, OrganizationDepartment, OrganizationMacroprocess } from '../../organization/organization';

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})
export class OrganizationStructureComponent implements OnInit {

  departments = [];
  macroprocesses = [];

  organization: Organization;
  selectedDepartmentId: number;

  constructor(private _crudService: CrudService) { }

  ngOnInit() {
    this.organization = <Organization> {
      id: 1,
      legalName: "Nome Empresarial",
      tradeName: "Nome Fantasia"
    };

    this.listDepartments();
    this.listMacroprocesses();
    this.getOrganizationDepartments(1);
  }


  getOrganizationDepartments(organizationId) {
    let url = `${CrudService.BaseUrl}/organizations/${organizationId}/departments`;

    this._crudService.getPage(url, 1, 100).subscribe(
      data => {
        this.organization.departments = data['data'].map(item => item.department);
      },
      err => {
        console.error(err);
      }
    );
  }

  addDepartment(selectedDepartmentId) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/departments`;

    this._crudService.post({ id: this.selectedDepartmentId }, url).subscribe(
      data => {
        this.selectedDepartmentId = null; // remove selection
        this.getOrganizationDepartments(1);
      },
      err => {
        console.error(err);
      }
    );
  }

  deleteDepartment(department: OrganizationDepartment) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/departments/${department.id}`;

    this._crudService.delete(url).subscribe(
      data => {
        this.getOrganizationDepartments(1);
      },
      err => {
        console.error(err);
      }
    );
  }

  toggleDepartmentMacroprocesses(department) {
    department.expanded = !department.expanded; 
    if (!department.expanded) {
      return;
    }
    this.getDepartmentMacroprocesses(department);
  }

  getDepartmentMacroprocesses(department) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/macroprocesses`;

    this._crudService.getPage(url, 1, 100).subscribe(
      data => {
        let macroprocesses = data['data'].filter(item => item.department.id == department.id);
        department.macroprocesses = macroprocesses.map(item => {
          let macroprocess: OrganizationMacroprocess = item.macroprocess;
          macroprocess.instanceId = item.instanceId;
          return macroprocess;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  addMacroprocess(department: OrganizationDepartment) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/macroprocesses`;

    this._crudService.post({ departmentId: department.id, macroprocessId: department.selectedMacroprocessId }, url).subscribe(
      data => {
        department.selectedMacroprocessId = null; // remove selection
        this.getDepartmentMacroprocesses(department);
      },
      err => {
        console.error(err);
      }
    );
  }

  deleteMacroprocess(macroprocess: OrganizationMacroprocess, department: OrganizationDepartment) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/macroprocesses/${macroprocess.instanceId}`;

    this._crudService.delete(url).subscribe(
      data => {
        this.getDepartmentMacroprocesses(department);
      },
      err => {
        console.error(err);
      }
    );
  }

  listDepartments() {
    let url = `${CrudService.BaseUrl}/departments`;

    this._crudService.get(url).subscribe(
      data => {
        this.departments = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  listMacroprocesses() {
    let url = `${CrudService.BaseUrl}/macroprocesses`;

    this._crudService.get(url).subscribe(
      data => {
        this.macroprocesses = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }
}
