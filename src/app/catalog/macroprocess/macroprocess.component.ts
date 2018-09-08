import { Component, OnInit } from '@angular/core';

import { CrudComponent } from '../../shared/crud/crud.component';
import { CrudService } from '../../shared/crud/crud.service';

@Component({
  selector: 'app-macroprocess',
  templateUrl: './macroprocess.component.html',
  styleUrls: ['./macroprocess.component.scss']
})

export class MacroprocessComponent extends CrudComponent<Macroprocess> implements OnInit {

  url = CrudService.BaseUrl + '/macroprocesses';

  ngOnInit() {
    this.getRecords(1);
  }
}
