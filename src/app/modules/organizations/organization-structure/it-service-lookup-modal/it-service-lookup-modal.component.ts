import { Component, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Constants } from '../../../../shared/constants';
import { CatalogItServiceService } from '../../../../services/api/catalog/it-service/catalog-it-service.service';

@Component({
  selector: 'app-it-service-lookup-modal',
  templateUrl: './it-service-lookup-modal.component.html',
  styleUrls: ['./it-service-lookup-modal.component.scss']
})
export class ItServiceLookupModalComponent implements OnInit {

  process: any;
  selectedItServiceId: number;
  selectedRelevanceId: number;
  confirmed = new EventEmitter();

  private itServices: any[];
  private ratingLevels = Constants.RATING_LEVELS;
  private editMode: boolean;

  constructor(private catalogItServiceService: CatalogItServiceService) { 

  }

  ngOnInit() {
    if (this.selectedItServiceId) {
      this.editMode = true;
    }
    this.loadItServices();
  }

  confirm() {
    this.confirmed.emit({
      itServiceId: this.selectedItServiceId,
      relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    });
  }

  private loadItServices() {
    this.catalogItServiceService.listItServices(1, 100).subscribe(
      response => {
        let itServices = response['data'];
        this.itServices = _.orderBy(itServices, ['name']);
      }
    );
  }
  
}
