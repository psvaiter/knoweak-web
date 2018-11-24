import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';

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

  loadingSecurityThreats: boolean;
  securityThreats: any[];
  ratingLevels = Constants.RATING_LEVELS;

  selectedSecurityThreatId: number;
  selectedThreatLevelId: number;
  editMode: boolean;

  constructor(
    private catalogSecurityThreatService: CatalogSecurityThreatService,
    private organizationSecurityThreatService: OrganizationSecurityThreatService
  ) { 

  }

  ngOnInit() {
    this.loadSecurityThreats();
    
    if (this.securityThreat) {
      this.editMode = true;
      this.selectedSecurityThreatId = this.securityThreat.id;

      if (this.securityThreat.threatLevel) {
        this.selectedThreatLevelId = this.securityThreat.threatLevel.id;
      }
    }
  }

  confirm() {
    if (!this.editMode) {
      this.addSecurityThreat();
    }
    else {
      this.patchSecurityThreat();
    }
  }

  private loadSecurityThreats() {
    this.loadingSecurityThreats = true;
    this.catalogSecurityThreatService.listSecurityThreats(1, 100)
      .pipe(finalize(() => this.loadingSecurityThreats = false))
      .subscribe(
        response => {
          this.securityThreats = response['data'];
          this.securityThreats.sort((a, b) => (a.name < b.name) ? -1 : 1);
        }
      );
  }

  private addSecurityThreat() {
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

  private patchSecurityThreat(): any {
    let request = {
      threatLevelId: this.selectedThreatLevelId
    };
    this.organizationSecurityThreatService.patchSecurityThreat(this.organization.id, this.securityThreat.id, request)
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
