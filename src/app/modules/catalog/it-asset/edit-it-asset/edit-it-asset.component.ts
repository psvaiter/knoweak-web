import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../shared/components/crud/crud.service';
import { CrudComponent } from '../../../../shared/components/crud/crud.component';

@Component({
  selector: 'app-edit-it-asset',
  templateUrl: './edit-it-asset.component.html',
  styleUrls: ['./edit-it-asset.component.scss']
})
export class EditItAssetComponent extends CrudComponent<ItAsset> implements OnInit {

  url = CrudService.BaseUrl + '/itAssets';
  id: number;
  categories = [];

  fieldLabels = new Map([
    ["categoryId", "Categoria"],
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
    this.getCategories();
    this.getSingleRecord(this.url + `/${this.id}`);
  }

  getCategories() {
    this._crudService.getPage(CrudService.BaseUrl + '/itAssetCategories', 1, 100).subscribe(
      data => {
        this.categories = data['data'];
      }
    );
  }

  patchRecord() {
    super.patchRecord(this.url + `/${this.id}`);
  }

  goBack(): void {
    this.location.back();
  }

}
