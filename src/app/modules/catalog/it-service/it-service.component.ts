import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';

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
