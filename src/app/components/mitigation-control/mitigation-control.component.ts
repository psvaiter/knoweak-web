import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-mitigation-control',
  templateUrl: './mitigation-control.component.html',
  styleUrls: ['./mitigation-control.component.scss']
})

export class MitigationControlComponent extends CrudComponent<MitigationControl> implements OnInit {
 
  url = CrudService.BaseUrl + '/mitigationControls';
 
  ngOnInit() {
    this.getRecords(1);
  }

}
