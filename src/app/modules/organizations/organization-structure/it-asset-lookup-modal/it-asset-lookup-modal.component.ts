import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Constants } from '../../../../shared/constants';
import { CatalogItAssetService } from '../../../../services/api/catalog/it-asset/catalog-it-asset.service';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { OrganizationItService } from '../../organization/organization';

@Component({
  selector: 'app-it-asset-lookup-modal',
  templateUrl: './it-asset-lookup-modal.component.html',
  styleUrls: ['./it-asset-lookup-modal.component.scss']
})
export class ItAssetLookupModalComponent implements OnInit {

  @Input() itService: OrganizationItService;
  
  itAssets: any[];
  ratingLevels = Constants.RATING_LEVELS;

  selectedItAssetSource: string;
  selectedItAssetId: number;
  selectedRelevanceId: number;
  externalIdentifier: string;
  confirmed = new EventEmitter();

  // Different IT asset sources that will be assigned to 'itAssets' by user choice
  private catalogItAssets: any[];
  private organizationItAssets: any[];

  constructor(
    private catalogItAssetService: CatalogItAssetService,
    private organizationItAssetService: OrganizationItAssetService
  ) {

  }

  ngOnInit() {
    this.loadCatalogItAssets();
    this.loadOrganizationItAssets();
  }

  confirm() {
    this.confirmed.emit({
      isNew: (this.selectedItAssetSource !== "organization"),
      itAssetId: this.selectedItAssetId,
      externalIdentifier: this.externalIdentifier,
      relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    });
  }

  selectCatalogSource() {
    if (this.itAssets != this.catalogItAssets) {
      this.selectedItAssetId = null;
      this.externalIdentifier = null;
      this.itAssets = this.catalogItAssets;
    }
  }

  selectOrganizationSource() {
    if (this.itAssets != this.organizationItAssets) {
      this.selectedItAssetId = null;
      this.externalIdentifier = null;
      this.itAssets = this.organizationItAssets;
    }
  }

  onItAssetChange(event) {
    if (this.selectedItAssetSource === "organization") {
      if (event) {
        this.externalIdentifier = event.externalIdentifier || "(Sem identificação)";
      }
      else {
        this.externalIdentifier = null;
      }
    }
    else {
      this.externalIdentifier = null;
    }
  }

  private loadCatalogItAssets() {
    this.catalogItAssetService.listItAssets(1, 100).subscribe(
      response => {
        this.catalogItAssets = response['data'];
        this.catalogItAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }

  private loadOrganizationItAssets() {
    this.organizationItAssetService.listItAssetsFromOrganization(this.itService.organizationId, 1, 100).subscribe(
      response => {
        this.organizationItAssets = response['data'].map(item => {
          let displayName = (item.externalIdentifier)
            ? `${item.itAsset.name} (${item.externalIdentifier})`
            : `${item.itAsset.name} (instância ${item.instanceId})`;

          return {
            id: item.itAsset.id,
            name: displayName,
            externalIdentifier: item.externalIdentifier
          };
        });

        this.organizationItAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
      },
      err => {
        console.error(err);
      }
    );
  }

}
