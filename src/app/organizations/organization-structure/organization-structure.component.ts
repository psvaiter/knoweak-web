import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organization, OrganizationDepartment, OrganizationMacroprocess } from '../organization/organization';
import { CrudService } from '../../shared/crud/crud.service';


@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})
export class OrganizationStructureComponent implements OnInit {

  departments = [];
  macroprocesses = [];

  organization: 
  Organization = new Organization();
  selectedDepartmentId: number;

  constructor(private _crudService: CrudService, private route: ActivatedRoute) {
    route.params.subscribe(params => this.organization.id = params['id']);
  }

  ngOnInit() {
    this.getOrganization();
    this.listDepartments();
    this.listMacroprocesses();
    this.getOrganizationDepartments();
  }

  getOrganization() {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}`;

    this._crudService.get(url).subscribe(
      data => {
        this.organization = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  getOrganizationDepartments() {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/departments`;

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
        this.getOrganizationDepartments();
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
        this.getOrganizationDepartments();
      },
      err => {
        console.error(err);
      }
    );
  }

  toggleDepartmentMacroprocesses(department: OrganizationDepartment) {
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

  addMacroprocess(department: OrganizationDepartment) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/macroprocesses`;

    this._crudService
      .post({ 
        departmentId: department.id,
        macroprocessId: department.selectedMacroprocessId 
      }, url)
      .subscribe(
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

  toggleMacroprocessProcesses(macroprocess: OrganizationMacroprocess) {
    macroprocess.expanded = !macroprocess.expanded; 
    if (!macroprocess.expanded) {
      return;
    }
    //this.getMacroprocessProcesses(macroprocess);
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
