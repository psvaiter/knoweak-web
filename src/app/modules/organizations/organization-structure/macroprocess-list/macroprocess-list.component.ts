import { Component, OnInit, Input } from '@angular/core';

import { OrganizationMacroprocess, OrganizationDepartment } from '../../organization/organization';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-macroprocess-list',
  templateUrl: './macroprocess-list.component.html',
  styleUrls: ['./macroprocess-list.component.scss']
})
export class MacroprocessListComponent implements OnInit {

  @Input() department: OrganizationDepartment;
  @Input() organizationId: number;

  macroprocesses: OrganizationMacroprocess[];

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getDepartmentMacroprocesses();
  }

  getDepartmentMacroprocesses() {
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses`;

    this.crudService.getPage(url, 1, 100).subscribe(
      data => {
        let macroprocesses = data['data'].filter(item => item.department.id == this.department.id);
        this.macroprocesses = macroprocesses.map(item => {
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
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses`;

    this.crudService
      .post(url, { 
        departmentId: department.id,
        macroprocessId: department.selectedMacroprocessId 
      })
      .subscribe(
        data => {
          department.selectedMacroprocessId = null; // remove selection
          this.getDepartmentMacroprocesses();
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteMacroprocess(macroprocess: OrganizationMacroprocess) {
    if (!confirm(`Deseja remover o macroprocesso "${macroprocess.name}" do departamento "${this.department.name}"?`)) {
      return;
    }
    
    let url = `${CrudService.BaseUrl}/organizations/${this.organizationId}/macroprocesses/${macroprocess.instanceId}`;

    this.crudService.delete(url).subscribe(
      data => {
        this.getDepartmentMacroprocesses();
      },
      err => {
        console.error(err);
      }
    );
  }

}
