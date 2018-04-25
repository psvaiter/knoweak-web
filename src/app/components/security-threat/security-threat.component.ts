import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-security-threat',
  templateUrl: './security-threat.component.html',
  styleUrls: ['./security-threat.component.scss']
})

export class SecurityThreatComponent extends CrudComponent<SecurityThreat> implements OnInit {

  url = CrudService.BaseUrl + '/securityThreats';
 
  ngOnInit() {
    this.getRecords(1);
  }

}

class SecurityThreat {
  id: number;
  name: string;
  description: string;
  createdOn: DateTimeFormat;
  lastModifiedOn: DateTimeFormat;
}
