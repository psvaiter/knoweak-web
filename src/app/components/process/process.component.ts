import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})

export class ProcessComponent extends CrudComponent<Process> implements OnInit {

  url = CrudService.BaseUrl + '/processes';

  ngOnInit() {
    this.getRecords(1);
  }

}
