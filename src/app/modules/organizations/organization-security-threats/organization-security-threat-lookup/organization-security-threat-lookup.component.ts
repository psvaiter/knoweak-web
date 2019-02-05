import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

import { Constants } from '../../../../shared/constants';
import { CatalogSecurityThreatService } from '../../../../services/api/catalog/security-threat/catalog-security-threat.service';
import { OrganizationSecurityThreatService } from '../../../../services/api/organization/organization-security-threat.service';
import { Utils } from '../../../../shared/utils';

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
  errors: any[];
  persisting: boolean;

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
    this.errors = null;

    if (!this.editMode) {
      this.addSecurityThreat();
    }
    else {
      this.patchSecurityThreat();
    }
  }

  disableSave() {
    if (this.persisting) {
      return true;
    }
    if (!this.selectedSecurityThreatId) {
      return true
    }
    return false;
  }

  private loadSecurityThreats() {
    this.loadingSecurityThreats = true;
    this.catalogSecurityThreatService.listSecurityThreats(1, 100)
      .pipe(finalize(() => this.loadingSecurityThreats = false))
      .subscribe(
        response => {
          let securityThreats = response['data'];
          this.securityThreats = _.orderBy(securityThreats, ['name']);
        }
      );
  }

  private addSecurityThreat() {
    let request = {
      securityThreatId: this.selectedSecurityThreatId,
      threatLevelId: this.selectedThreatLevelId
    };

    this.persisting = true;
    this.organizationSecurityThreatService.addSecurityThreat(this.organization.id, request)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

  private patchSecurityThreat(): any {
    let request = {
      threatLevelId: this.selectedThreatLevelId
    };

    this.persisting = true;
    this.organizationSecurityThreatService.patchSecurityThreat(this.organization.id, this.securityThreat.id, request)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        response => {
          this.added.emit(request);
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

}
