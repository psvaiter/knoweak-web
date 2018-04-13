import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department, DepartmentService } from '../department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  id: number;
  department: Department = new Department();
  persistedDepartment: Department = new Department();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private _departmentService: DepartmentService) { 
    
      route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.loadDepartment();
  }

  goBack(): void {
    this.location.back();
  }

  private loadDepartment() {
    this._departmentService.getById(this.id).subscribe(
      data => {
        this.persistedDepartment = data['data'];
        this.department = Object.assign({}, this.persistedDepartment);
      }, 
      err => console.error(err)
    );
  }

  private saveChanges(): void {
    if (!this.hasDepartmentChanged()) {
      return;
    }

    this._departmentService.patch(this.department).subscribe(
      data => {
        this.persistedDepartment = data['data'];
        this.department = Object.assign({}, this.persistedDepartment);
      },
      err => console.error(err)
    );
  }

  private hasDepartmentChanged(): boolean {
    return JSON.stringify(this.department) != JSON.stringify(this.persistedDepartment);
  }

}
