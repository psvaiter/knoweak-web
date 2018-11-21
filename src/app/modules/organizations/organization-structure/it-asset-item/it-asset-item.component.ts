import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizationItAsset } from '../../organization/organization';

@Component({
  selector: 'app-it-asset-item',
  templateUrl: './it-asset-item.component.html',
  styleUrls: ['./it-asset-item.component.scss']
})
export class ItAssetItemComponent implements OnInit {

  @Input() itAsset: OrganizationItAsset;
  @Output() delete = new EventEmitter();
  
  organizationId: number;

  constructor() { }

  ngOnInit() {
    this.organizationId = this.itAsset.organizationId;
  }

  deleteItAsset() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.itAsset);
  }

}
