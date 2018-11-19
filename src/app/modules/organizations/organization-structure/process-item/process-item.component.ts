import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OrganizationProcess, OrganizationItService, RatingLevel } from '../../organization/organization';
import { ItServiceLookupModalComponent } from '../it-service-lookup-modal/it-service-lookup-modal.component';
import { OrganizationItServiceService } from '../../../../services/api/organization/organization-it-service.service';
import { Constants } from '../../../../shared/constants';

@Component({
  selector: 'app-process-item',
  templateUrl: './process-item.component.html',
  styleUrls: ['./process-item.component.scss']
})
export class ProcessItemComponent implements OnInit {

  @Input() process: OrganizationProcess;
  @Output() delete = new EventEmitter();
  
  expanded: boolean;
  organizationId: number;
  itServices: OrganizationItService[];

  constructor(
    private modalService: BsModalService,
    private organizationItServiceService: OrganizationItServiceService
  ) { 

  }

  ngOnInit() {
    this.organizationId = this.process.organizationId;
  }

  toggleItServices() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      return;
    }
    this.listProcessItServices();
  }

  deleteProcess() {
    // Emit event asking for parent component to remove from its register
    this.delete.emit(this.process);
  }

  addItService() {
    // Open modal
    let modalRef = this.modalService.show(ItServiceLookupModalComponent, {
      class: 'modal-md',
      initialState: {
        process: this.process
      }
    });

    // Act on confirmation
    modalRef.content.confirmed.subscribe(eventData => {
      let organizationItService = new OrganizationItService();
      organizationItService.id = eventData.itServiceId;
      organizationItService.relevance = eventData.relevance;

      this.requestAddItService(organizationItService);
      modalRef.hide();
    });
  }

  removeItService(itService: OrganizationItService) {
    if (!confirm(`Deseja remover o serviço de TI "${itService.name}" do processo "${this.process.name}"?`)) {
      return;
    }

    this.organizationItServiceService.removeItService(this.organizationId, itService.instanceId).subscribe(
      response => {
        this.listProcessItServices();
      },
      err => {
        console.error(err);
      }
    );
  }

  private listProcessItServices() {
    this.organizationItServiceService.listItServices(this.organizationId, 1, 100, this.process.instanceId).subscribe(
      response => {
        this.itServices = response['data']
          .filter(item => item.processInstanceId == this.process.instanceId)
          .map(item => {
            let itService = new OrganizationItService();

            itService.instanceId = item.instanceId;
            itService.id = item.itService.id;
            itService.name = item.itService.name;

            if (item.relevanceLevelId) {
              itService.relevance = new RatingLevel();
              itService.relevance.id = item.relevanceLevelId;
              itService.relevance.name = Constants.RATING_LEVELS.find(level => level.id == item.relevanceLevelId).name;
            }

            itService.organizationId = this.organizationId;
            itService.process = this.process;

            return itService;
          });

        this.itServices.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }

  private requestAddItService(itService: OrganizationItService) {
    let request = {
      processInstanceId: this.process.instanceId,
      itServiceId: itService.id,
      relevanceLevelId: itService.relevance
    };
    this.organizationItServiceService.addItService(this.organizationId, request).subscribe(
      response => {
        this.listProcessItServices();
      },
      err => {
        console.error(err);
      }
    );
  }

}
