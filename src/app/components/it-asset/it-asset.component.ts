import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../utils/crud/crud.component';
import { CrudService } from '../utils/crud/crud.service';

@Component({
  selector: 'app-it-asset',
  templateUrl: './it-asset.component.html',
  styleUrls: ['./it-asset.component.scss']
})

export class ItAssetComponent extends CrudComponent<ItAsset> implements OnInit {

  url = CrudService.BaseUrl + '/itAssets';
  
  categories = [
    { id: 1, name: "Hardware" },
    { id: 2, name: "Infraestrutura" },
    { id: 3, name: "Pessoa" }
  ]

  ngOnInit() {
    this.getRecords(1);
  }

}

class ItAsset {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  createdOn: DateTimeFormat;
  lastModifiedOn: DateTimeFormat;
}

class ItAssetCategory {
  id: number;
  name: string;
}
