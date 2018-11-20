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
      organizationItAsset.id = eventData.itAssetId;
      organizationItAsset.relevance = eventData.relevance;

      this.requestAddItAsset(organizationItAsset);
      modalRef.hide();
    });
  }

  removeItAsset(itAsset: OrganizationItAsset) {
    if (!confirm(`Deseja remover o ativo de TI "${itAsset.name}" do serviço de TI "${this.itService.name}"?`)) {
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

            itAsset.instanceId = item.instanceId;
            itAsset.id = item.itAsset.id;
            itAsset.name = item.itAsset.name;

            if (item.relevanceLevelId) {
              itAsset.relevance = new RatingLevel();
              itAsset.relevance.id = item.relevanceLevelId;
              itAsset.relevance.name = Constants.RATING_LEVELS.find(level => level.id == item.relevanceLevelId).name;
            }

            itAsset.organizationId = this.organizationId;
            itAsset.itService = this.itService;

            return itAsset;
          });

        this.itAssets.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }

  private requestAddItAsset(itAsset: OrganizationItAsset) {
    let request = {
      itServiceInstanceId: this.itService.instanceId,
      itAssetId: itAsset.id,
      relevanceLevelId: (itAsset.relevance) ? itAsset.relevance.id : null
    };
    this.organizationItAssetService.addItAsset(this.organizationId, this.itService.instanceId, request).subscribe(
      response => {
        this.listItServiceItAssets();
      },
      err => {
        console.error(err);
      }
    );
  }

}
