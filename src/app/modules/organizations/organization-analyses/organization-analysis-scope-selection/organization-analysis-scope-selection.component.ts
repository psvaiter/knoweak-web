import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { OrganizationDepartmentService } from '../../../../services/api/organization/organization-department.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-organization-analysis-scope-selection',
  templateUrl: './organization-analysis-scope-selection.component.html',
  styleUrls: ['./organization-analysis-scope-selection.component.scss']
})
export class OrganizationAnalysisScopeSelectionComponent implements OnInit {

  @Input() organizationId: number;
  loading: boolean;

  departments: any[];
  selectedDepartments: number[];

  constructor(
    private organizationDepartmentService: OrganizationDepartmentService
  ) { }

  ngOnInit() {
    this.listDepartments();
  }

  listDepartments() {
    this.loading = true;
    this.organizationDepartmentService.listDepartments(this.organizationId, 1, 100)
      .pipe(finalize(() => this.loading = false))
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

}
