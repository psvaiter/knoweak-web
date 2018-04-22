import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department } from '../department';
import { ActivatedRoute } from '@angular/router';
import { CrudComponent } from '../../utils/crud/crud.component';
import { CrudService } from '../../utils/crud/crud.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})

export class EditDepartmentComponent extends CrudComponent<Department> implements OnInit {

  url = CrudService.BaseUrl + '/departments';
  id: number;
  department: Department = new Department();
  errors = [];

  constructor(
    protected _crudService: CrudService,
    private location: Location,
    private route: ActivatedRoute) { 
    
      super(_crudService);
      route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.getSingleRecord(this.url + `/${this.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
