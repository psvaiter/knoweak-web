import { Component, OnInit } from '@angular/core';

import { Department } from './department';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { CrudService } from '../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends CrudComponent<Department> implements OnInit {

  url = CrudService.BaseUrl + '/departments';
  
  fieldLabels = new Map([
    ["name", "Nome"]
  ]);

  ngOnInit() {
    this.getRecords(1);
  }

}
