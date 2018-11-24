import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { CatalogItAssetService } from '../../../../services/api/catalog/it-asset/catalog-it-asset.service';
import { finalize } from 'rxjs/operators';

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
    if (!this.editMode) {
      this.addItAsset();
    }
    else {
      this.patchItAsset();
    }
  }

  private loadItAssets() {
    this.loadingItAssets = true;
    this.catalogItAssetService.listItAssets(1, 100)
      .pipe(finalize(() => this.loadingItAssets = false))
      .subscribe(
        response => {
          this.itAssets = response['data'];
          this.itAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
        }
      );
  }

  private addItAsset() {
    let request = {
      itAssetId: this.selectedItAssetId,
      externalIdentifier: this.externalIdentifier
    };
    this.organizationItAssetService.addItAssetToOrganization(this.organization.id, request)
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          console.error(err);
        }
      );
  }

  private patchItAsset(): any {
    let request = {
      externalIdentifier: this.externalIdentifier
    };
    this.organizationItAssetService.patchItAsset(this.organization.id, this.itAsset.instanceId, request)
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          console.error(err);
        }
      );
  }

}
