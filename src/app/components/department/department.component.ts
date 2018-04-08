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
