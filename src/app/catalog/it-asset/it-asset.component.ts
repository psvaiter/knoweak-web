import { Component, OnInit } from '@angular/core';

import { CrudComponent } from '../../shared/crud/crud.component';
import { CrudService } from '../../shared/crud/crud.service';


@Component({
  selector: 'app-it-asset',
  templateUrl: './it-asset.component.html',
  styleUrls: ['./it-asset.component.scss']
})

export class ItAssetComponent extends CrudComponent<ItAsset> implements OnInit {

  url = CrudService.BaseUrl + '/itAssets';
  categories = [];

  ngOnInit() {
    this.getCategories();
    this.getRecords(1);
  }

  getCategories() {
    this._crudService.getPage(CrudService.BaseUrl + '/itAssetCategories', 1, 100).subscribe(
      data => {
        this.categories = data['data'];
      }
    );
  }

}
