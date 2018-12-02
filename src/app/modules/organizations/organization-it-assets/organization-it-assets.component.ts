import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Organization } from '../organization/organization';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { OrganizationItAssetService } from '../../../services/api/organization/organization-it-asset.service';
import { OrganizationItAssetLookupComponent } from './organization-it-asset-lookup/organization-it-asset-lookup.component';
import { Paging } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-organization-it-assets',
  templateUrl: './organization-it-assets.component.html',
  styleUrls: ['./organization-it-assets.component.scss']
})
export class OrganizationItAssetsComponent implements OnInit {

  loading: boolean;
  organization: Organization = new Organization();
  itAssets: any[];
  paging: Paging = new Paging();

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationItAssetService: OrganizationItAssetService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.organization.id = +params.get('id');
    });
  }

  ngOnInit() {
    this.loadOrganizationData();
    this.loadItAssets();
  }

  addItem() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationItAssetLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization
      }
    });

    modalRef.content.added.subscribe(eventData => {
      this.loadItAssets();
      modalRef.hide();
    });
  }

  editItem(itAsset) {
    // Open modal
    let modalRef = this.modalService.show(OrganizationItAssetLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization,
        itAsset: itAsset
      }
    });

    // Act on confirmation
    modalRef.content.added.subscribe(eventData => {
      this.loadItAssets();
      modalRef.hide();
    });
  }

  removeItem(itAsset) {
    let displayName = (itAsset.externalIdentifier)
      ? `Deseja remover o ativo "${itAsset.name} (${itAsset.externalIdentifier})" da organização?`
      : `Deseja remover o ativo "${itAsset.name} (instância ${itAsset.instanceId})" da organização?`;
    
    if (!confirm(displayName)) {
      return;
    }
    
    this.organizationItAssetService.removeItAsset(this.organization.id, itAsset.instanceId)
      .subscribe(
        response => {
          this.loadItAssets();
        },
        err => {
          console.error(err);
        }
      );
  }

  getPrevPage() {
    this.loadItAssets(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.loadItAssets(this.paging.currentPage + 1);
  }

  private loadOrganizationData() {
    this.organization.legalName = "Carregando...";
    this.organizationService.getById(this.organization.id)
      .subscribe(
        response => {
          this.organization.legalName = response['data'].legalName;
        }, 
        err => {
          this.organization.legalName = "--- Falha ao carregar nome da organização ---";
        }
      );
  }

  private loadItAssets(page: number = 1) {
    this.itAssets = null;
    this.loading = true;

    this.organizationItAssetService.listItAssets(this.organization.id, page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.itAssets = response['data'].map(item => {
            return {
              instanceId: item.instanceId,
              id: item.itAsset.id,
              name: item.itAsset.name,
              externalIdentifier: item.externalIdentifier
            };
          });
          this.paging = Object.assign(this.paging, response['paging']);
        }, 
        err => {
          console.error(err);
        }
      );
  }
  
}
