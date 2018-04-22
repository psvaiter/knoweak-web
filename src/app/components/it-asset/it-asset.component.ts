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

  ngOnInit() {
    this.getRecords(1);
  }

}

class ItAsset {
  id: number;
  name: string;
  createdOn: DateTimeFormat;
  lastModifiedOn: DateTimeFormat;
}
