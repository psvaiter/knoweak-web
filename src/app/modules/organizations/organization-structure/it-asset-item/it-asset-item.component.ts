import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Constants } from '../../../../shared/constants';
import { OrganizationItAsset } from '../../organization';
import { OrganizationItServiceItAssetService } from '../../../../services/api/organization/organization-it-service-it-asset.service';
import { ItAssetLookupModalComponent } from '../it-asset-lookup-modal/it-asset-lookup-modal.component';

@Component({
  selector: 'app-it-asset-item',
  templateUrl: './it-asset-item.component.html',
  styleUrls: ['./it-asset-item.component.scss']
})
export class ItAssetItemComponent implements OnInit {

  @Input() itAsset: OrganizationItAsset;
  @Output() delete = new EventEmitter();
  @Output() edited = new EventEmitter();

  private organizationId: number;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private organizationItServiceItAssetService: OrganizationItServiceItAssetService
  ) {

  }

  ngOnInit() {
    this.organizationId = this.itAsset.organizationId;
  }

  editItAsset() {
    // Open modal
    let modalRef = this.modalService.show(ItAssetLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        itService: this.itAsset.itService,
        selectedItAsset: this.itAsset,
        selectedRelevanceId: (this.itAsset.relevance) ? this.itAsset.relevance.id : null
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      // Patch IT service
      let request = {
        relevanceLevelId: (eventData.relevance) ? eventData.relevance.id : null
      };
      this.organizationItServiceItAssetService
        .patchItAsset(this.organizationId, this.itAsset.itService.instanceId, this.itAsset.instanceId, request)
        .subscribe(
          response => {
            this.itAsset.relevance = Constants.RATING_LEVELS.find(level => level.id == response['data'].relevanceLevelId)
            this.edited.emit(this.itAsset);
            modalRef.hide();
          }
        );
    });
  }

  deleteItAsset() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.itAsset);
  }

  manageVulnerabilities() {
    this.router.navigate(['/organizations', this.organizationId, 'itAssets', this.itAsset.instanceId, 'vulnerabilities']);
  }
}
