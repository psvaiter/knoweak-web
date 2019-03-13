import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../shared/components/crud/crud.component';

@Component({
  selector: 'app-security-threat',
  templateUrl: './security-threat.component.html',
  styleUrls: ['./security-threat.component.scss']
})
export class SecurityThreatComponent extends CrudComponent<SecurityThreat> implements OnInit {

  url = CrudService.BaseUrl + '/securityThreats';

  fieldLabels = new Map([
    ["name", "Nome"],
    ["description", "Descrição"]
  ]);
  
  ngOnInit() {
    this.getRecords(1);
  }

}
