import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrudComponent } from '../../utils/crud/crud.component';
import { CrudService } from '../../utils/crud/crud.service';

@Component({
  selector: 'app-edit-security-threat',
  templateUrl: './edit-security-threat.component.html',
  styleUrls: ['./edit-security-threat.component.scss']
})
export class EditSecurityThreatComponent extends CrudComponent<SecurityThreat> implements OnInit {

  url = CrudService.BaseUrl + '/securityThreats';
  id: number;

  constructor(
    protected _crudService: CrudService,
    private location: Location,
    private route: ActivatedRoute) {
      
      super(_crudService);
      route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.getSingleRecord(this.url + `/${this.id}`);
  }

  patchRecord() {
    super.patchRecord(this.url + `/${this.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
