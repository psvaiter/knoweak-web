import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationSecurityThreatLookupComponent } from './organization-security-threat-lookup/organization-security-threat-lookup.component';
import { OrganizationService } from '../../../services/api/organization/organization.service';
import { OrganizationSecurityThreatService } from '../../../services/api/organization/organization-security-threat.service';
import { Constants } from '../../../shared/constants';

@Component({
  selector: 'app-security-threats',
  templateUrl: './security-threats.component.html',
  styleUrls: ['./security-threats.component.scss']
})
export class SecurityThreatsComponent implements OnInit {

  loading: boolean;
  organizationLegalName: string;
  securityThreats: [];

  private organizationId: number;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private organizationService: OrganizationService,
    private organizationSecurityThreatService: OrganizationSecurityThreatService
  ) { 
    route.paramMap.subscribe(params => {
      this.organizationId = +params.get('id');
    });
  }

  ngOnInit() {
    // Get organization name to show
    this.organizationLegalName = "Carregando...";
    this.organizationService.getById(this.organizationId)
      .subscribe(
        response => {
          this.organizationLegalName = response['data'].legalName;
        },
        err => {
          this.organizationLegalName = "--- Falha ao carregar nome da organização ---"
        }
      );
      
    // Load security threats of organization
    this.loading = true;
    this.organizationSecurityThreatService.listSecurityThreats(this.organizationId, 1)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          console.log(response);
          this.securityThreats = response['data'].map(item => {
            return {
              name: item.securityThreat.name,
              threatLevel: Constants.RATING_LEVELS.find(level => level.id == item.threatLevelId)
            };
          });
        },
        err => {
          console.error(err);
        }
      );
  }

  addItem() {
    // Open modal
    let modalRef = this.modalService.show(OrganizationSecurityThreatLookupComponent, {
      class: 'modal-md',
      initialState: {
        
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      //modalRef.hide();
    });
  }

  editItem(securityThreat) {
    // Open modal
    let modalRef = this.modalService.show(OrganizationSecurityThreatLookupComponent, {
      class: 'modal-md',
      initialState: {
        securityThreat: securityThreat
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      //modalRef.hide();
    });
  }

  removeItem(securityThreat) {
    if (!confirm(`Deseja remover a ameaça "${securityThreat.name}" da organização?`)) {
      return;
    }
    // TODO: remove
  }

}
