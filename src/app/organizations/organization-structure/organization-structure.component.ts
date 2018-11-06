import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Organization, OrganizationDepartment, OrganizationMacroprocess, OrganizationProcess, RatingLevel, OrganizationItService, OrganizationItAsset } from '../organization/organization';
import { CrudService } from '../../shared/components/crud/crud.service';

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

  organization: Organization = new Organization();

  constructor(
    private _crudService: CrudService, 
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) {
    route.params.subscribe(params => this.organization.id = params['id']);
  }

  ngOnInit() {
    this.getOrganization();
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
      .post(url, {
        macroprocessInstanceId: macroprocess.instanceId,
        processId: macroprocess.selectedProcessId,
        relevanceLevelId: macroprocess.selectedProcessRelevanceId
      })
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
      .post(url, {
        processInstanceId: process.instanceId,
        itServiceId: process.selectedItServiceId,
        relevanceLevelId: process.selectedItServiceRelevanceId
      })
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
    let urlAddServiceAsset = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itServices/${itService.instanceId}/itAssets`;

    let matchedItAsset = this.itAssets.find(asset => asset == itService.selectedItem);
    if (matchedItAsset && !matchedItAsset.instanceId) {

      // Add IT asset to organization first
      let urlAddOrganizationAsset = `${CrudService.BaseUrl}/organizations/${this.organization.id}/itAssets`;
      let requestAddOrganizationAsset = { 
        itAssetId: itService.selectedItem.id,
        externalIdentifier: itService.selectedExternalIdentifier
      };

      this._crudService
        .post(urlAddOrganizationAsset, requestAddOrganizationAsset)
        .subscribe(
          data => {
            let requestAddServiceAsset = { 
              itAssetInstanceId: data['data'].instanceId,
              relevanceLevelId: itService.selectedItAssetRelevanceId
            };
      
            this._crudService
              .post(urlAddServiceAsset, requestAddServiceAsset)
              .subscribe(
                data => {
                  // remove selection
                  itService.selectedItem = null;
                  itService.selectedExternalIdentifier = null;
                  itService.selectedItAssetRelevanceId = null;
                  
                  this.getItServiceItAssets(itService);
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
    else {
      let requestAddServiceAsset = { 
        itAssetInstanceId: matchedItAsset.instanceId,
        relevanceLevelId: itService.selectedItAssetRelevanceId
      };

      this._crudService
        .post(urlAddServiceAsset, requestAddServiceAsset)
        .subscribe(
          data => {
            // remove selection
            itService.selectedItem = null;
            itService.selectedExternalIdentifier = null;
            itService.selectedItAssetRelevanceId = null;
            
            this.getItServiceItAssets(itService);
          },
          err => {
            console.error(err);
          }
        );
    }
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

            // Concatenate and sort (those with external identifiers to avoid duplicate)
            this.itAssets = this.itAssets
              .concat(organizationItAssets.filter(asset => asset && asset.externalIdentifier))
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
