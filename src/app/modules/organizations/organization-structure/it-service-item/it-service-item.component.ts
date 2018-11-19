import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationItService, OrganizationItAsset } from '../../organization/organization';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';

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
  ) { }

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

  private listItServiceItAssets() {
    
  }

}
