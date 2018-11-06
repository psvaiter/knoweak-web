import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Department } from '../department';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent extends CrudComponent<Department> implements OnInit {

  url = CrudService.BaseUrl + '/departments';
  id: number;

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

  patchRecord() {
    super.patchRecord(this.url + `/${this.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
