import { Component, OnInit } from '@angular/core';
import { DepartmentService, Department } from './department.service';
import { Paging } from '../pagination/pagination.component';

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

  getDepartments(page?: number, recordsPerPage?: number) {
    this._departmentService.getAll(page, recordsPerPage).subscribe(
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
        this.getDepartments(this.paging.currentPage);
        this.paging = Object.assign(this.paging, data['paging']);
        this.newDepartment.name = "";
      },
      err => console.error(err)
    );
  }

  getPrevPage() {
    if (this.paging.currentPage <= 1) {
      return;
    }
    this.getDepartments(this.paging.currentPage - 1);
  }

  getNextPage() {
    if (this.paging.currentPage >= this.paging.totalPages) {
      return;
    }
    this.getDepartments(this.paging.currentPage + 1);
  }
}
