import { Component, OnInit, EventEmitter } from '@angular/core';
import { Constants } from '../../../../shared/constants';
import { CatalogItServiceService } from '../../../../services/api/catalog/it-service/catalog-it-service.service';

@Component({
  selector: 'app-it-service-lookup-modal',
  templateUrl: './it-service-lookup-modal.component.html',
  styleUrls: ['./it-service-lookup-modal.component.scss']
})
export class ItServiceLookupModalComponent implements OnInit {

  itServices: any[];
  ratingLevels = Constants.RATING_LEVELS;

  selectedItServiceId: number;
  selectedRelevanceId: number;
  confirmed = new EventEmitter();

  constructor(private catalogItServiceService: CatalogItServiceService) { 

  }

  ngOnInit() {
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
        this.itServices = response['data'];
        this.itServices.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }
  
}
