import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../../shared/components/crud/crud.component';

@Component({
  selector: 'app-edit-mitigation-control',
  templateUrl: './edit-mitigation-control.component.html',
  styleUrls: ['./edit-mitigation-control.component.scss']
})
export class EditMitigationControlComponent extends CrudComponent<MitigationControl> implements OnInit {

  url = CrudService.BaseUrl + '/mitigationControls';
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
