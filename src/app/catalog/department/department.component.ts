import { Component, OnInit } from '@angular/core';

import { CrudComponent } from '../../shared/crud/crud.component';
import { CrudService } from '../../shared/crud/crud.service';
import { Department } from './department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent extends CrudComponent<Department> implements OnInit {

  url = CrudService.BaseUrl + '/departments';

  ngOnInit() {
    this.getRecords(1);
  }

}
