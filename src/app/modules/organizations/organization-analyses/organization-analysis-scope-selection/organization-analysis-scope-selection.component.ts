import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

import { OrganizationDepartmentService } from '../../../../services/api/organization/organization-department.service';
import { OrganizationProcessService } from '../../../../services/api/organization/organization-process.service';
import { OrganizationMacroprocessService } from '../../../../services/api/organization/organization-macroprocess.service';

@Component({
  selector: 'app-organization-analysis-scope-selection',
  templateUrl: './organization-analysis-scope-selection.component.html',
  styleUrls: ['./organization-analysis-scope-selection.component.scss']
})
export class OrganizationAnalysisScopeSelectionComponent implements OnInit {

  @Input() organizationId: number;

  loadingDepartments: boolean;
  departments: any[];
  selectedDepartments: number[];

  loadingMacroprocesses: boolean;
  macroprocesses: any[];
  selectedMacroprocesses: number[];

  loadingProcesses: boolean;
  processes: any[];
  selectedProcesses: number[];

  constructor(
    private organizationDepartmentService: OrganizationDepartmentService,
    private organizationMacroprocessService: OrganizationMacroprocessService,
    private organizationProcessService: OrganizationProcessService
  ) { }

  ngOnInit() {
    this.listDepartments();
  }

  listDepartments() {
    this.loadingDepartments = true;
    this.organizationDepartmentService.listDepartments(this.organizationId, 1, 100)
      .pipe(finalize(() => this.loadingDepartments = false))
      .subscribe(
        response => {
          let departments = response['data'].map(item => {
            return item.department;
          });
          this.departments = _.orderBy(departments, ['name']);
        },
        err => {
          console.error(err);
        }
      );
  }
  
  onAddDepartment(department){
    // Fetch and show child macroprocesses
    this.listMacroprocesses(department.id);
  }
  
  onRemoveDepartment(department){
    let departmentId = department.value.id;
    
    // Remove selection of macroprocesses corresponding to department unselected
    this.selectedMacroprocesses = this.selectedMacroprocesses.filter(instanceId => {
      let macroprocess = this.macroprocesses.find(item => item.instanceId == instanceId);
      if (macroprocess.department.id == departmentId) {
        this.onRemoveMacroprocess(macroprocess);
        return false;
      }
      return true;
    });
    
    // Remove macroprocesses from list
    this.macroprocesses = this.macroprocesses.filter(item => item.department.id != departmentId);
  }

  listMacroprocesses(departmentId: number) {
    this.loadingMacroprocesses = true;
    this.organizationMacroprocessService.list(this.organizationId, 1, 100, departmentId)
      .pipe(finalize(() => this.loadingMacroprocesses = false))
      .subscribe(
        response => {
          let macroprocesses = response['data'].map(item => {
            item.macroprocess.department = item.department;
            item.macroprocess.instanceId = item.instanceId;
            return item.macroprocess;
          });
          this.macroprocesses = (this.macroprocesses || []).concat(macroprocesses);
          this.macroprocesses = _.orderBy(this.macroprocesses, ['department.name', 'name']);
          console.log(this.macroprocesses);
        },
        err => {
          console.error(err);
        }
      );
  }

  groupByDepartmentFn(macroprocess) {
    return macroprocess.department.name;
  }

  onAddMacroprocess(macroprocess){
    // Fetch and show child processes
    this.listProcesses(macroprocess.instanceId);
  }

  onRemoveMacroprocess(macroprocess){
    let macroprocessInstanceId = macroprocess.instanceId || macroprocess.value.instanceId;
    
    // Remove selection of processes corresponding to macroprocess unselected
    this.selectedProcesses = this.selectedProcesses.filter(instanceId => {
      let process = this.processes.find(item => item.instanceId == instanceId);
      return process.macroprocess.instanceId != macroprocessInstanceId;
    });

    // Remove child processes
    this.processes = this.processes.filter(item => item.macroprocess.instanceId != macroprocessInstanceId);
  }
  
  listProcesses(macroprocessInstanceId: number) {
    this.loadingProcesses = true;
    this.organizationProcessService.listProcesses(this.organizationId, 1, 100, macroprocessInstanceId)
      .pipe(finalize(() => this.loadingProcesses = false))
      .subscribe(
        response => {
          let processes = response['data'].map(item => {
            item.process.macroprocess = this.macroprocesses.find(mp => mp.instanceId == item.macroprocessInstanceId);
            item.process.instanceId = item.instanceId;
            return item.process;
          });
          this.processes = (this.processes || []).concat(processes);
          this.processes = _.orderBy(this.processes, ['macroprocess.department.name', 'macroprocess.name', 'name']);
          console.log(this.processes);
        },
        err => {
          console.error(err);
        }
      );
  }

  groupByMacroprocessFn(process) {
    return `${process.macroprocess.department.name} / ${process.macroprocess.name}`;
  }
  
}
