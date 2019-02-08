import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

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
  
  loading: boolean;
  persisting: boolean;
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
    this.errors = null;
    this.persisting = true;

    this.addToCatalogIfNotExist(this.selectedDepartment)
      .then((department) => this.addToOrganization(department))
      .then(() => this.added.emit())
      .catch(err => this.errors = Utils.getErrors(err))
      .then(() => this.persisting = false);
  }

  addNewOption(name: string) {
    return { name: name };
  }

  private loadDepartments(): void {
    this.loading = true;

    this.catalogDepartmentService.listDepartments(1, 100)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.departments = response['data'] || [];
        },
        err => {
          console.error(err);
        }
      );
  }

  private addToOrganization(department): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      this.organizationDepartmentService.addDepartment(this.organizationId, { id: department.id })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );

    });
  }

  private addToCatalogIfNotExist(department): Promise<any> {
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

  private isAlreadyInCatalog(item) {
    return item && item.id;
  }
  
}
