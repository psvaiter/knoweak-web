import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../../shared/components/crud/crud.component';

@Component({
  selector: 'app-edit-it-service',
  templateUrl: './edit-it-service.component.html',
  styleUrls: ['./edit-it-service.component.scss']
})
export class EditItServiceComponent extends CrudComponent<ItService> implements OnInit {

  url = CrudService.BaseUrl + '/itServices';
  id: number;

  fieldLabels = new Map([
    ["name", "Nome"],
    ["description", "Descrição"]
  ]);

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
