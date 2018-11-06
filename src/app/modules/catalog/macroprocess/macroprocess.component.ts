import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';

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
