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
  name: string;
  
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

    if (this.isFromCatalog()) {
      this.addDepartmentToOrganization(this.selectedDepartment)
        .then(() => {
          this.persisting = false;
          this.added.emit();
        })
        .catch(err => this.errors = Utils.getErrors(err));
    }
    else {
      this.addDepartmentToCatalog(this.selectedDepartment.name)
        .then((department) => this.addDepartmentToOrganization(department))
        .then(() => {
          this.persisting = false;
          this.added.emit();
        })
        .catch(err => this.errors = Utils.getErrors(err));
    }
  }

  addNewOption(name: string) {
    return { name: name };
  }

  private isFromCatalog() {
    return this.selectedDepartment && this.selectedDepartment.id;
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

  private addDepartmentToCatalog(name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      this.catalogDepartmentService.addDepartment({ name: name })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );
    });
  }
  
}
