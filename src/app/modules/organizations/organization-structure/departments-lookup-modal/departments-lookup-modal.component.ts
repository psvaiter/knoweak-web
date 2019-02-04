import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CatalogDepartmentService } from '../../../../services/api/catalog/department/catalog-department.service';
import { OrganizationDepartmentService } from '../../../../services/api/organization/organization-department.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-departments-lookup-modal',
  templateUrl: './departments-lookup-modal.component.html',
  styleUrls: ['./departments-lookup-modal.component.scss']
})
export class DepartmentsLookupModalComponent implements OnInit {
  
  @Input() organizationId: number;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  
  selectedDepartmentId: number;
  departments = [];
  errors: any[];

  constructor(
    private catalogDepartmentService: CatalogDepartmentService,
    private organizationDepartmentService: OrganizationDepartmentService
  ) { 
    
  }

  ngOnInit() {
    this.loadDepartments();
  }

  confirm(): void {
    this.addDepartment(this.selectedDepartmentId);
  }

  private loadDepartments(): void {
    this.catalogDepartmentService.listDepartments(1, 100).subscribe(
      response => {
        this.departments = response['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  private addDepartment(departmentId) {
    this.errors = null;

    this.organizationDepartmentService.addDepartment(this.organizationId, { id: departmentId })
    .subscribe(
      data => {
        this.added.emit();
      },
      err => {
        this.errors = Utils.getErrors(err);
      }
    );
  }
  
}
