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
  
  selectedDepartment: any;
  departments = [];
  
  errors: any[];
  loading: boolean;
  persisting: boolean;

  constructor(
    private catalogDepartmentService: CatalogDepartmentService,
    private organizationDepartmentService: OrganizationDepartmentService
  ) { 
    
  }

  ngOnInit() {
    this.loadDepartments();
  }

  confirm(): void {
    this.errors = null;
    this.persisting = true;

    this.addDepartmentToCatalogIfNotExist(this.selectedDepartment)
      .then((department) => this.addDepartmentToOrganization(department))
      .then(() => {
        this.persisting = false;
        this.added.emit();
      })
      .catch(err => this.errors = Utils.getErrors(err));
  }

  addNewOption(name: string) {
    return { name: name };
  }

  private loadDepartments(): void {
    this.catalogDepartmentService.listDepartments(1, 100).subscribe(
      response => {
        this.departments = response['data'] || [];
      },
      err => {
        console.error(err);
      }
    );
  }

  private addDepartmentToOrganization(department): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      this.organizationDepartmentService.addDepartment(this.organizationId, { id: department.id })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );
    });
  }

  private addDepartmentToCatalogIfNotExist(department): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (this.isAlreadyInCatalog(department)) {
        return resolve(department);
      }

      this.catalogDepartmentService.addDepartment({ name: department.name })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );
    });
  }

  private isAlreadyInCatalog(department) {
    return department && department.id;
  }
  
}
