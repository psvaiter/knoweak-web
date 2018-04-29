import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends CrudComponent<User> implements OnInit {

  url = CrudService.BaseUrl + '/management/users';
  roles: SystemRole[] = [];

  ngOnInit() {
    this.getSystemRoles();
    this.getRecords(1);
  }

  getSystemRoles() {
    this._crudService.getPage(CrudService.BaseUrl + '/management/roles', 1, 100).subscribe(
      data => {
        this.roles = data['data'];
      }
    );
  }

}
