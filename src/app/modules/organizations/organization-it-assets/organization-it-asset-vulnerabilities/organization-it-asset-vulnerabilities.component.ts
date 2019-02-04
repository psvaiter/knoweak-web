import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Constants } from '../../../../shared/constants';
import { AuthService } from '../../../../services/auth/auth.service';
import { Organization, OrganizationItAsset } from '../../organization';
import { Paging } from '../../../../shared/components/pagination/pagination.component';
import { OrganizationService } from '../../../../services/api/organization/organization.service';
import { OrganizationItAssetService } from '../../../../services/api/organization/organization-it-asset.service';
import { OrganizationItAssetVulnerabilityLookupComponent } from './organization-it-asset-vulnerability-lookup/organization-it-asset-vulnerability-lookup.component';
import { OrganizationItAssetVulnerabilityService } from '../../../../services/api/organization/organization-it-asset-vulnerability.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-organization-it-asset-vulnerabilities',
  templateUrl: './organization-it-asset-vulnerabilities.component.html',
  styleUrls: ['./organization-it-asset-vulnerabilities.component.scss']
})
export class OrganizationItAssetVulnerabilitiesComponent implements OnInit {

  loading: boolean;
  organization: Organization = new Organization();
  itAsset: OrganizationItAsset = new OrganizationItAsset();
  vulnerabilities: any[];
  paging: Paging = new Paging();
  userCanManage: boolean;
  errors: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationItAssetService: OrganizationItAssetService,
    private organizationItAssetVulnerabilityService: OrganizationItAssetVulnerabilityService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.organization.id = +params.get('id');
      this.itAsset.instanceId = +params.get('instanceId');
    });
  }

  ngOnInit() {
    this.loadOrganizationData();
    this.loadItAssetData();
    this.loadVulnerabilities();

    this.userCanManage = this.auth.userHasScopes(['manage:organizations']);
  }

  addItem() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationItAssetVulnerabilityLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization,
        itAsset: this.itAsset
      }
    });

    // Act on event 'added'
    modalRef.content.added.subscribe(eventData => {
      this.loadVulnerabilities();
      modalRef.hide();
    });
  }

  editItem(vulnerability) {
    // Open modal
    let modalRef = this.modalService.show(OrganizationItAssetVulnerabilityLookupComponent, {
      class: 'modal-md',
      initialState: {
        organization: this.organization,
        itAsset: this.itAsset,
        vulnerability: vulnerability
      }
    });

    // Act on event 'added'
    modalRef.content.added.subscribe(eventData => {
      this.loadVulnerabilities();
      modalRef.hide();
    });
  }

  removeItem(vulnerability) {
    if (!confirm(`Deseja remover a vulnerabilidade com relação à ameaça "${vulnerability.securityThreat.name}"?`)) {
      return;
    }
    
    this.organizationItAssetVulnerabilityService
      .removeVulnerability(this.organization.id, this.itAsset.instanceId, vulnerability.securityThreat.id)
      .subscribe(
        response => {
          this.loadVulnerabilities();
        },
        err => {
          let messages = Utils.getErrors(err).map(e => e.message);
          alert(messages.join(" | "));
        }
      );
  }

  getPrevPage() {
    this.loadVulnerabilities(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.loadVulnerabilities(this.paging.currentPage + 1);
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

  private loadItAssetData(): any {
    this.itAsset.name = "Carregando...";
    this.organizationItAssetService.getItAssetByInstanceId(this.organization.id, this.itAsset.instanceId)
      .subscribe(
        response => {
          this.itAsset.name = response['data'].itAsset.name;
          if (response['data'].externalIdentifier) {
            this.itAsset.name += ` (${response['data'].externalIdentifier})`;
          }
        }, 
        err => {
          this.itAsset.name = "--- Falha ao carregar nome do ativo ---";
        }
      );
  }

  private loadVulnerabilities(page: number = 1) {
    this.vulnerabilities = null;
    this.loading = true;

    this.organizationItAssetVulnerabilityService.listVulnerabilities(this.organization.id, this.itAsset.instanceId, page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.vulnerabilities = response['data'].map(item => {
            return {
              level: Constants.RATING_LEVELS.find(level => level.id == item.vulnerabilityLevelId),
              securityThreat: item.securityThreat
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
