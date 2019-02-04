import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { Constants } from '../../../../shared/constants';
import { CatalogItAssetService } from '../../../../services/api/catalog/it-asset/catalog-it-asset.service';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { OrganizationItService, OrganizationItAsset } from '../../organization';
import { OrganizationItServiceItAssetService } from '../../../../services/api/organization/organization-it-service-it-asset.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-it-asset-lookup-modal',
  templateUrl: './it-asset-lookup-modal.component.html',
  styleUrls: ['./it-asset-lookup-modal.component.scss']
})
export class ItAssetLookupModalComponent implements OnInit {

  @Input() itService: OrganizationItService;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  
  editMode: boolean;

  organizationId: number;
  itAssets: any[];
  selectedItAssetSource: string;
  selectedItAsset: any;
  externalIdentifier: string;
  ratingLevels = Constants.RATING_LEVELS;
  selectedRelevanceId: number;
  errors: any[]
  
  // Different IT asset sources that will be assigned to 'itAssets' by user choice
  private catalogItAssets: any[];
  private organizationItAssets: any[];

  constructor(
    private catalogItAssetService: CatalogItAssetService,
    private organizationItAssetService: OrganizationItAssetService,
    private organizationItServiceItAssetService: OrganizationItServiceItAssetService
  ) {

  }

  ngOnInit() {
    this.organizationId = this.itService.organizationId;
    
    if (this.selectedItAsset) {
      this.editMode = true;
    }
    else {
      this.loadCatalogItAssets();
      this.loadOrganizationItAssets();
    }
  }

  confirm() {
    this.errors = null;

    if (this.editMode) {

    }
    else {
      this.addItAsset(this.selectedItAsset);
    }
    // this.confirmed.emit({
    //   itAssetInstanceId: this.selectedItAsset.instanceId,
    //   itAssetId: this.selectedItAsset.id,
    //   externalIdentifier: this.externalIdentifier,
    //   relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    // });
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
      this.externalIdentifier = eventData.externalIdentifier;
      return;
    }

    // Erase external identifier if IT asset is from catalog or if field is empty
    this.externalIdentifier = null;
  }

  private cleanup() {
    this.selectedItAsset = null;
    this.externalIdentifier = null;
    this.errors = null;
  }

  private loadCatalogItAssets() {
    this.catalogItAssetService.listItAssets(1, 100).subscribe(
      response => {
        let catalogItAssets = response['data'].map(item => {
          return {
            instanceId: null,
            id: item.id,
            name: item.name,
            displayName: item.name,
            externalIdentifier: null
          };
        });
        this.catalogItAssets = _.orderBy(catalogItAssets, ['name']);
      }
    );
  }

  private loadOrganizationItAssets() {
    this.organizationItAssetService.listItAssets(this.itService.organizationId, 1, 100).subscribe(
      response => {
        let organizationItAssets = response['data'].map(item => {
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

        this.organizationItAssets = _.orderBy(organizationItAssets, ['displayName']);
      },
      err => {
        console.error(err);
      }
    );
  }

  private addItAsset(itAsset: OrganizationItAsset) {

      let isItAssetInOrganization = itAsset.instanceId;
      if (isItAssetInOrganization) {
        
        this.addItServiceItAsset(itAsset.instanceId, this.selectedRelevanceId)
          .then(() => this.added.emit())
          .catch((err) => this.errors = Utils.getErrors(err));
      }
      else {
        
        this.addOrganizationItAsset(itAsset.id, this.externalIdentifier)
          .then((response) => {
            let itAssetInstanceId = response['data'].instanceId;
            return this.addItServiceItAsset(itAssetInstanceId, this.selectedRelevanceId);
          })
          .then(() => this.added.emit())
          .catch((err) => this.errors = Utils.getErrors(err));
      }
  }

  private addItServiceItAsset(itAssetInstanceId: number, relevanceLevelId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      let request = {
        itAssetInstanceId: itAssetInstanceId,
        relevanceLevelId: relevanceLevelId
      };
      
      this.organizationItServiceItAssetService.addItAsset(this.organizationId, this.itService.instanceId, request)
        .subscribe(resolve, reject);
    });
  }

  private addOrganizationItAsset(itAssetId: number, externalIdentifier: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      let request = {
        itAssetId: itAssetId,
        externalIdentifier: Utils.sanitizeText(externalIdentifier)
      };

      this.organizationItAssetService.addItAsset(this.organizationId, request)
        .subscribe(resolve, reject);
    });
  }

}
