import { Component, OnInit } from '@angular/core';

import { CrudComponent } from '../../shared/crud/crud.component';
import { CrudService } from '../../shared/crud/crud.service';

@Component({
  selector: 'app-it-service',
  templateUrl: './it-service.component.html',
  styleUrls: ['./it-service.component.scss']
})

export class ItServiceComponent extends CrudComponent<ItService> implements OnInit {

  url = CrudService.BaseUrl + '/itServices';

  ngOnInit() {
    this.getRecords(1);
  }

}
