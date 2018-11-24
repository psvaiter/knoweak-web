import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Constants } from '../../../../shared/constants';
import { CatalogSecurityThreatService } from '../../../../services/api/catalog/security-threat/catalog-security-threat.service';
import { OrganizationSecurityThreatService } from '../../../../services/api/organization/organization-security-threat.service';

@Component({
  selector: 'app-organization-security-threat-lookup',
  templateUrl: './organization-security-threat-lookup.component.html',
  styleUrls: ['./organization-security-threat-lookup.component.scss']
})
export class OrganizationSecurityThreatLookupComponent implements OnInit {

  @Input() organization: any;
  @Input() securityThreat: any;
  @Output() added = new EventEmitter();

  securityThreats: any[];
  ratingLevels = Constants.RATING_LEVELS;

  selectedSecurityThreatId: number;
  selectedThreatLevelId: number;

  constructor(
    private catalogSecurityThreatService: CatalogSecurityThreatService,
    private organizationSecurityThreatService: OrganizationSecurityThreatService
  ) { 

  }

  ngOnInit() {
    this.loadSecurityThreats();
  }

  confirm() {
    // TODO: block buttons (enable when done)

    let request = {
      securityThreatId: this.selectedSecurityThreatId,
      threatLevelId: this.selectedThreatLevelId 
    };
    this.organizationSecurityThreatService.addSecurityThreat(this.organization.id, request)
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          console.error(err);
        }
      );
  }

  private loadSecurityThreats() {
    this.catalogSecurityThreatService.listSecurityThreats(1, 100).subscribe(
      response => {
        this.securityThreats = response['data'];
        this.securityThreats.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }
}
