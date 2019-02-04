import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Constants } from '../../../shared/constants';
import { AuthService } from '../../../services/auth/auth.service';
import { OrganizationSecurityThreatLookupComponent } from './organization-security-threat-lookup/organization-security-threat-lookup.component';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { OrganizationSecurityThreatService } from '../../../services/api/organization/organization-security-threat.service';
import { Organization } from '../organization';
import { Paging } from '../../../shared/components/pagination/pagination.component';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-organization-security-threats',
  templateUrl: './organization-security-threats.component.html',
  styleUrls: ['./organization-security-threats.component.scss']
})
export class OrganizationSecurityThreatsComponent implements OnInit {

  loading: boolean;
  organization: Organization = new Organization();
  securityThreats: any[];
  paging: Paging = new Paging();
  userCanManage: boolean;
  errors: any[];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationSecurityThreatService: OrganizationSecurityThreatService
  ) {
    route.paramMap.subscribe(params => {
      this.organization.id = +params.get('id');
    });
  }

  ngOnInit() {
    this.loadOrganizationData();
    this.loadSecurityThreats();

    this.userCanManage = this.auth.userHasScopes(['manage:organizations']);
  }

  addItem() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationSecurityThreatLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization
      }
    });

    modalRef.content.added.subscribe(eventData => {
      this.loadSecurityThreats();
      modalRef.hide();
    });
  }

  editItem(securityThreat) {
    // Open modal
    let modalRef = this.modalService.show(OrganizationSecurityThreatLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization,
        securityThreat: securityThreat
      }
    });

    // Act on confirmation
    modalRef.content.added.subscribe(eventData => {
      this.loadSecurityThreats();
      modalRef.hide();
    });
  }

  removeItem(securityThreat) {
    if (!confirm(`Deseja remover a ameaça "${securityThreat.name}" da organização?`)) {
      return;
    }
    
    this.organizationSecurityThreatService.removeSecurityThreat(this.organization.id, securityThreat.id)
      .subscribe(
        response => {
          this.loadSecurityThreats();
        },
        err => {
          let messages = Utils.getErrors(err).map(e => e.message);
          alert(messages.join(" | "));
        }
      );
  }

  getPrevPage() {
    this.loadSecurityThreats(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.loadSecurityThreats(this.paging.currentPage + 1);
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

  private loadSecurityThreats(page: number = 1) {
    this.securityThreats = null;
    this.loading = true;

    this.organizationSecurityThreatService.listSecurityThreats(this.organization.id, page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.securityThreats = response['data'].map(item => {
            return {
              id: item.securityThreat.id,
              name: item.securityThreat.name,
              threatLevel: Constants.RATING_LEVELS.find(level => level.id == item.threatLevelId)
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
