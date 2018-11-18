import { Component, OnInit, EventEmitter } from '@angular/core';
import { CatalogDepartmentService } from '../../../../services/api/catalog/department/catalog-department.service';

@Component({
  selector: 'app-departments-lookup-modal',
  templateUrl: './departments-lookup-modal.component.html',
  styleUrls: ['./departments-lookup-modal.component.scss']
})
export class DepartmentsLookupModalComponent implements OnInit {
  
  selectedDepartmentId: number;
  departments = [];
  confirmed = new EventEmitter<number>();

  constructor(
    private catalogDepartmentService: CatalogDepartmentService
  ) { 
    
  }

  ngOnInit() {
    this.loadDepartments();
  }

  confirm(): void {
    this.confirmed.emit(this.selectedDepartmentId);
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

}
