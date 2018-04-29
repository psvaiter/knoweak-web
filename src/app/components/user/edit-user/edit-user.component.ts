import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrudComponent } from '../../utils/crud/crud.component';
import { CrudService } from '../../utils/crud/crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent extends CrudComponent<User> implements OnInit {

  url = CrudService.BaseUrl + '/management/users';
  id: number;
  roles: SystemRole[] = [];

  constructor(
    protected _crudService: CrudService,
    private location: Location,
    private route: ActivatedRoute) {
      
      super(_crudService);
      route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.getSystemRoles();
    this.getSingleRecord(this.url + `/${this.id}`);
  }

  getSystemRoles() {
    this._crudService.getPage(CrudService.BaseUrl + '/management/roles', 1, 100).subscribe(
      data => {
        this.roles = data['data'];
      }
    );
  }

  patchRecord() {
    super.patchRecord(this.url + `/${this.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
