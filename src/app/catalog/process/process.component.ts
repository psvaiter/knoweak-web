import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/components/crud/crud.service';
import { CrudComponent } from '../../shared/components/crud/crud.component';

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
