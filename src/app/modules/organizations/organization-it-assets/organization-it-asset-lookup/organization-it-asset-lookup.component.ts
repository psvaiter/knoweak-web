import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { CatalogItAssetService } from '../../../../services/api/catalog/it-asset/catalog-it-asset.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-organization-it-asset-lookup',
  templateUrl: './organization-it-asset-lookup.component.html',
  styleUrls: ['./organization-it-asset-lookup.component.scss']
})
export class OrganizationItAssetLookupComponent implements OnInit {

  @Input() organization: any;
  @Input() itAsset: any;
  @Output() added = new EventEmitter();

  loadingItAssets: boolean;
  itAssets: any[];

  selectedItAssetId: number;
  externalIdentifier: string;
  editMode: boolean;
  errors: any[];
  persisting: boolean;

  constructor(
    private catalogItAssetService: CatalogItAssetService,
    private organizationItAssetService: OrganizationItAssetService
  ) { 

  }

  ngOnInit() {
    this.loadItAssets();
    
    if (this.itAsset) {
      this.editMode = true;
      this.selectedItAssetId = this.itAsset.id;
      this.externalIdentifier = this.itAsset.externalIdentifier;
    }
  }

  confirm() {
    this.errors = null;

    if (!this.editMode) {
      this.addItAsset();
    }
    else {
      this.patchItAsset();
    }
  }

  disableSave() {
    if (this.persisting) {
      return true;
    }
    if (!this.selectedItAssetId) {
      return true;
    }
    return false;
  }

  private loadItAssets() {
    this.loadingItAssets = true;
    this.catalogItAssetService.listItAssets(1, 100)
      .pipe(finalize(() => this.loadingItAssets = false))
      .subscribe(
        response => {
          let itAssets = response['data'];
          this.itAssets = _.orderBy(itAssets, ['name']);
        }
      );
  }

  private addItAsset() {
    let request = {
      itAssetId: this.selectedItAssetId,
      externalIdentifier: Utils.sanitizeText(this.externalIdentifier)
    };

    this.persisting = true;
    this.organizationItAssetService.addItAsset(this.organization.id, request)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

  private patchItAsset(): any {
    let request = {
      externalIdentifier: Utils.sanitizeText(this.externalIdentifier)
    };

    this.persisting = true;
    this.organizationItAssetService.patchItAsset(this.organization.id, this.itAsset.instanceId, request)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

}
