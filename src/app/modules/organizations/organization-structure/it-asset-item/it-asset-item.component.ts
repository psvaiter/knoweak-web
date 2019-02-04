import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

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
        selectedItAsset: this.itAsset
      }
    });

    // Act on confirmation
    modalRef.content.edited.subscribe(itAsset => {
      this.itAsset.relevance = itAsset.relevance;
      modalRef.hide();
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
