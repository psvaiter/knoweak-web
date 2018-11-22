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
  selectedItAsset: any;
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
      itAssetInstanceId: this.selectedItAsset.instanceId,
      itAssetId: this.selectedItAsset.id,
      externalIdentifier: this.externalIdentifier,
      relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    });
  }

  selectCatalogSource() {
    if (this.itAssets != this.catalogItAssets) {
      this.cleanup();
      this.itAssets = this.catalogItAssets;
    }
  }

  selectOrganizationSource() {
    if (this.itAssets != this.organizationItAssets) {
      this.cleanup();
      this.itAssets = this.organizationItAssets;
    }
  }

  onItAssetChange(eventData) {
    // Set appropriate external identifier if IT asset is in organization
    if (eventData && eventData.instanceId) {
      this.externalIdentifier = eventData.externalIdentifier || "(Nenhuma)";
      return;
    }

    // Erase external identifier if IT asset is from catalog or if field is empty
    this.externalIdentifier = null;
  }

  private cleanup() {
    this.selectedItAsset = null;
    this.externalIdentifier = null;
  }

  private loadCatalogItAssets() {
    this.catalogItAssetService.listItAssets(1, 100).subscribe(
      response => {
        this.catalogItAssets = response['data'].map(item => {
          return {
            instanceId: null,
            id: item.id,
            name: item.name,
            displayName: item.name,
            externalIdentifier: null
          };
        });
        this.catalogItAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }

  private loadOrganizationItAssets() {
    this.organizationItAssetService.listItAssetsFromOrganization(this.itService.organizationId, 1, 100).subscribe(
      response => {
        this.organizationItAssets = response['data'].map(item => {
          return {
            instanceId: item.instanceId,
            id: item.itAsset.id,
            name: item.itAsset.name,
            displayName: (item.externalIdentifier)
              ? `${item.itAsset.name} (${item.externalIdentifier})`
              : `${item.itAsset.name} (instância ${item.instanceId})`,
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
