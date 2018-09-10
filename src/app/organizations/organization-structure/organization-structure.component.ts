import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organization, OrganizationDepartment, OrganizationMacroprocess, OrganizationProcess, RatingLevel, OrganizationItService, OrganizationItAsset } from '../organization/organization';
import { CrudService } from '../../shared/crud/crud.service';


@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})
export class OrganizationStructureComponent implements OnInit {

  departments = [];
  macroprocesses = [];
  processes = [];
  itServices = [];
  itAssets = [];

  ratingLevels = [
    {id: 1, name: "Muito baixa"},
    {id: 2, name: "Baixa"},
    {id: 3, name: "Média"},
    {id: 4, name: "Alta"},
    {id: 5, name: "Muito alta"}
  ]

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
    this.listProcesses();
    this.listItServices();
    this.listItAssets();
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
    if (!confirm(`Deseja remover o departamento "${department.name}" da organização?`)) {
      return;
    }

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
    if (!confirm(`Deseja remover o macroprocesso "${macroprocess.name}" do departamento "${department.name}"?`)) {
      return;
    }
    
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
    this.getMacroprocessProcesses(macroprocess);
  }

  getMacroprocessProcesses(macroprocess) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/processes`;

    this._crudService.getPage(url, 1, 100).subscribe(
      data => {
        let processes = data['data'].filter(item => item.macroprocessInstanceId == macroprocess.instanceId);
        macroprocess.processes = processes.map(item => {
          let process: OrganizationProcess;
          process = item.process;
          process.instanceId = item.instanceId;
          process.relevance = this.ratingLevels.find(lvl => lvl.id == item.relevanceLevelId);
          return process;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  addProcess(macroprocess: OrganizationMacroprocess) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/processes`;

    this._crudService
      .post({ 
        macroprocessInstanceId: macroprocess.instanceId,
        processId: macroprocess.selectedProcessId,
        relevanceLevelId: macroprocess.selectedProcessRelevanceId
      }, url)
      .subscribe(
        data => {
          // remove selection
          macroprocess.selectedProcessId = null;
          macroprocess.selectedProcessRelevanceId = null;
          
          this.getMacroprocessProcesses(macroprocess);
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteProcess(process: OrganizationProcess, macroprocess: OrganizationMacroprocess) {
    if (!confirm(`Deseja remover o processo "${process.name}" do macroprocesso "${macroprocess.name}"?`)) {
      return;
    }
    
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/processes/${process.instanceId}`;

    this._crudService.delete(url).subscribe(
      data => {
        this.getMacroprocessProcesses(macroprocess);
      },
      err => {
        console.error(err);
      }
    );
  }
  
  toggleProcessItServices(process: OrganizationProcess) {
    process.expanded = !process.expanded; 
    if (!process.expanded) {
      return;
    }
    this.getProcessItServices(process);
  }

  getProcessItServices(process) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices`;

    this._crudService.getPage(url, 1, 100).subscribe(
      data => {
        let itServices = data['data'].filter(item => item.processInstanceId == process.instanceId);
        process.itServices = itServices.map(item => {
          let itService: OrganizationItService;
          itService = item.itService;
          itService.instanceId = item.instanceId;
          itService.relevance = this.ratingLevels.find(lvl => lvl.id == item.relevanceLevelId);
          return itService;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  addItService(process: OrganizationProcess) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices`;

    this._crudService
      .post({ 
        processInstanceId: process.instanceId,
        itServiceId: process.selectedItServiceId,
        relevanceLevelId: process.selectedItServiceRelevanceId
      }, url)
      .subscribe(
        data => {
          // remove selection
          process.selectedItServiceId = null;
          process.selectedItServiceRelevanceId = null;
          
          this.getProcessItServices(process);
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteItService(itService: OrganizationItService, process: OrganizationProcess) {
    if (!confirm(`Deseja remover o serviço "${itService.name}" do processo "${process.name}"?`)) {
      return;
    }
    
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices/${itService.instanceId}`;

    this._crudService.delete(url).subscribe(
      data => {
        this.getProcessItServices(process);
      },
      err => {
        console.error(err);
      }
    );
  }

  toggleItServiceItAssets(itService: OrganizationItService) {
    itService.expanded = !itService.expanded; 
    if (!itService.expanded) {
      return;
    }
    this.getItServiceItAssets(itService);
  }

  getItServiceItAssets(itService) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices/${itService.instanceId}/itAssets`;

    this._crudService.getPage(url, 1, 100).subscribe(
      data => {
        let itAssets = data['data'].filter(item => item.itServiceInstanceId == itService.instanceId);
        itService.itAssets = itAssets.map(item => {
          let itAsset = new OrganizationItAsset();
          itAsset.instanceId = item.itAssetInstanceId;
          itAsset.id = item.itAssetInstance.itAsset.id;
          itAsset.name = item.itAssetInstance.itAsset.name;
          itAsset.externalIdentifier = item.itAssetInstance.externalIdentifier
          itAsset.relevance = this.ratingLevels.find(lvl => lvl.id == item.relevanceLevelId);
          return itAsset;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  addItAsset(itService: OrganizationItService) {
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices/${itService.instanceId}/itAssets`;
    console.log(itService);
    this._crudService
      .post({ 
        itAssetInstanceId: itService.selectedItAssetId,
        relevanceLevelId: itService.selectedItAssetRelevanceId
      }, url)
      .subscribe(
        data => {
          // remove selection
          itService.selectedItAssetId = null;
          itService.selectedItAssetRelevanceId = null;
          
          this.getItServiceItAssets(itService);
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteItAsset(itAsset: OrganizationItAsset, itService: OrganizationItService) {
    if (!confirm(`Deseja remover o ativo "${itAsset.name}" do serviço "${itService.name}"?`)) {
      return;
    }
    
    let url = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices/${itService.instanceId}/itAssets/${itAsset.instanceId}`;

    this._crudService.delete(url).subscribe(
      data => {
        this.getItServiceItAssets(itService);
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

  listProcesses() {
    let url = `${CrudService.BaseUrl}/processes`;

    this._crudService.get(url).subscribe(
      data => {
        this.processes = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  listItServices() {
    let url = `${CrudService.BaseUrl}/itServices`;

    this._crudService.get(url).subscribe(
      data => {
        this.itServices = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  listItAssets() {
    let url = `${CrudService.BaseUrl}/itAssets`;

    this._crudService.get(url).subscribe(
      data => {
        this.itAssets = data['data'];
        
        // Union with organization it assets
        this._crudService.get(`${CrudService.BaseUrl}/organizations/${this.organization.id}/itAssets`).subscribe(
          data => {
            // Map to a format compatible with the existing one in this.itAssets
            let organizationItAssets = data['data'].map(item => {
              let matchedItAsset = this.itAssets.find(asset => asset.id == item.itAsset.id);
              let itAssetCopy = Object.assign({}, matchedItAsset);
              itAssetCopy.instanceId = item.instanceId;
              itAssetCopy.externalIdentifier = item.externalIdentifier;
              if (itAssetCopy.externalIdentifier) {
                itAssetCopy.name = `${itAssetCopy.name} (${itAssetCopy.externalIdentifier})`;
              }
              return itAssetCopy;
            });

            // Concatenate and sort
            this.itAssets = this.itAssets
              .concat(organizationItAssets)
              .sort((a, b) => (a.name < b.name) ? -1 : 1);
          },
          err => {
            console.error(err);
          }
        );
      },
      err => {
        console.error(err);
      }
    );
  }
}
