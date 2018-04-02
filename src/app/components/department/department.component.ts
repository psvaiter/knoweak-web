import { Component, OnInit } from '@angular/core';
import { DepartmentService, Department } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departments: Department[];
  paging: Paging = new Paging();
  newDepartment: Department = new Department();

  constructor(private _departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this._departmentService.getAll().subscribe(
      data => {
        this.departments = data['data'];
        this.paging = Object.assign(this.paging, data['paging']);
      },
      err => console.error(err)
    );
  }

  createDepartment() {
    this._departmentService.create(this.newDepartment).subscribe(
      data => {
        this.getDepartments();
        this.paging = Object.assign(this.paging, data['paging']);
      },
      err => console.error(err)
    );
  }
}



class Paging {
  currentPage: number = 0;
  recordsPerPage: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;

  getCurrentStart() {
    // Empty page
    if (this.currentPage == 0 || this.totalRecords == 0) {
      return 0;
    }

    // All other situations
    return ((this.currentPage - 1) * this.recordsPerPage) + 1;
  }

  getCurrentEnd() {
    let recordsInPage = this.recordsPerPage;

    // Empty page
    if (this.currentPage == 0 || this.totalRecords == 0) {
      return 0;
    }

    // Special case for if current page is the last page
    if (this.currentPage == this.totalPages) {
      let remainder = this.totalRecords % this.recordsPerPage;
      recordsInPage = (remainder > 0) ? remainder : this.recordsPerPage;
    }

    return this.getCurrentStart() + recordsInPage - 1;
  }
}
