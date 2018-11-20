import { Component, OnInit, EventEmitter } from '@angular/core';
import { Constants } from '../../../../shared/constants';
import { CatalogItAssetService } from '../../../../services/api/catalog/it-asset/catalog-it-asset.service';

@Component({
  selector: 'app-it-asset-lookup-modal',
  templateUrl: './it-asset-lookup-modal.component.html',
  styleUrls: ['./it-asset-lookup-modal.component.scss']
})
export class ItAssetLookupModalComponent implements OnInit {

  itAssets: any[];
  ratingLevels = Constants.RATING_LEVELS;

  selectedItAssetId: number;
  selectedRelevanceId: number;
  confirmed = new EventEmitter();

  constructor(private catalogItAssetService: CatalogItAssetService) { 

  }

  ngOnInit() {
    this.loadItAssets();
  }

  confirm() {
    this.confirmed.emit({
      itAssetId: this.selectedItAssetId,
      relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    });
  }

  private loadItAssets() {
    this.catalogItAssetService.listItAssets(1, 100).subscribe(
      response => {
        this.itAssets = response['data'];
        this.itAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }
  
}
