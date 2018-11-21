import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Constants } from '../../../../shared/constants';
import { OrganizationItService, OrganizationItAsset, RatingLevel } from '../../organization/organization';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { ItAssetLookupModalComponent } from '../it-asset-lookup-modal/it-asset-lookup-modal.component';

@Component({
  selector: 'app-it-service-item',
  templateUrl: './it-service-item.component.html',
  styleUrls: ['./it-service-item.component.scss']
})
export class ItServiceItemComponent implements OnInit {

  @Input() itService: OrganizationItService;
  @Output() delete = new EventEmitter();

  expanded: boolean;
  organizationId: number;
  itAssets: OrganizationItAsset[];

  constructor(
    private modalService: BsModalService,
    private organizationItAssetService: OrganizationItAssetService
  ) { 

  }

  ngOnInit() {
    this.organizationId = this.itService.organizationId;
  }

  toggleItAssets() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listItServiceItAssets();
  }

  deleteItService() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.itService);
  }

  addItAsset() {
    // Open modal
    let modalRef = this.modalService.show(ItAssetLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        itService: this.itService
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      let organizationItAsset = new OrganizationItAsset();
      organizationItAsset.instanceId = eventData.instanceId;
      organizationItAsset.id = eventData.itAssetId;
      organizationItAsset.relevance = eventData.relevance;
      organizationItAsset.externalIdentifier = eventData.externalIdentifier;

      this.requestAddItAsset(organizationItAsset)
        .then(() => {
          this.listItServiceItAssets();
          modalRef.hide();
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  removeItAsset(itAsset: OrganizationItAsset) {
    let itAssetDisplayName = (itAsset.externalIdentifier)
      ? `${itAsset.name} - ${itAsset.externalIdentifier}`
      : `${itAsset.name} (instância ${itAsset.instanceId})`;

    if (!confirm(`Deseja remover o ativo de TI "${itAssetDisplayName}" do serviço de TI "${this.itService.name}"?`)) {
      return;
    }

    this.organizationItAssetService.removeItAsset(this.organizationId, this.itService.instanceId, itAsset.instanceId).subscribe(
      response => {
        this.listItServiceItAssets();
      },
      err => {
        console.error(err);
      }
    );
  }
  
  private listItServiceItAssets() {
    this.organizationItAssetService.listItAssets(this.organizationId, this.itService.instanceId, 1, 100).subscribe(
      response => {
        this.itAssets = response['data']
          .filter(item => item.itServiceInstanceId == this.itService.instanceId)
          .map(item => {
            let itAsset = new OrganizationItAsset();

            itAsset.instanceId = item.itAssetInstanceId;
            itAsset.externalIdentifier = item.itAssetInstance.externalIdentifier;
            itAsset.id = item.itAssetInstance.itAsset.id;
            itAsset.name = item.itAssetInstance.itAsset.name;

            if (item.relevanceLevelId) {
              itAsset.relevance = new RatingLevel();
              itAsset.relevance.id = item.relevanceLevelId;
              itAsset.relevance.name = Constants.RATING_LEVELS.find(level => level.id == item.relevanceLevelId).name;
            }

            itAsset.organizationId = this.organizationId;
            itAsset.itService = this.itService;

            return itAsset;
          });

        this.itAssets.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          if (a.externalIdentifier < b.externalIdentifier) return -1;
          return 1;
        });
      }
    );
  }

  private requestAddItAsset(itAsset: OrganizationItAsset): Promise<void> {
    return new Promise((resolve, reject) => {
  
      if (!itAsset.instanceId) {
        
        let request = {
          itAssetId: itAsset.id,
          externalIdentifier: itAsset.externalIdentifier
        };

        this.organizationItAssetService.addItAssetToOrganization(this.organizationId, request).subscribe(
          response => {
            
            let request = {
              itServiceInstanceId: this.itService.instanceId,
              itAssetInstanceId: response['data'].instanceId,
              relevanceLevelId: (itAsset.relevance) ? itAsset.relevance.id : null
            };
    
            this.organizationItAssetService.addItAsset(this.organizationId, this.itService.instanceId, request).subscribe(
              response => resolve(),
              err => reject(err)
            );

          },
          err => {
            reject(err);
          }
        );
      }
      else {
        let request = {
          itServiceInstanceId: this.itService.instanceId,
          itAssetInstanceId: itAsset.instanceId,
          relevanceLevelId: (itAsset.relevance) ? itAsset.relevance.id : null
        };

        this.organizationItAssetService.addItAsset(this.organizationId, this.itService.instanceId, request).subscribe(
          response => resolve(),
          err => reject(err)
        );
      }

    });
  }

}
