import { Component, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CatalogProcessService } from '../../../../services/api/catalog/process/catalog-process.service';
import { Constants } from '../../../../shared/constants';

@Component({
  selector: 'app-process-lookup-modal',
  templateUrl: './process-lookup-modal.component.html',
  styleUrls: ['./process-lookup-modal.component.scss']
})
export class ProcessLookupModalComponent implements OnInit {

  macroprocess: any;
  selectedProcessId: number;
  selectedRelevanceId: number;
  confirmed = new EventEmitter();
  
  processes: any[];
  ratingLevels = Constants.RATING_LEVELS;
  editMode: boolean;

  constructor(private catalogProcessService: CatalogProcessService) { }

  ngOnInit() {
    if (this.selectedProcessId) {
      this.editMode = true;
    }
    this.loadProcesses();
  }

  confirm() {
    this.confirmed.emit({
      processId: this.selectedProcessId,
      relevance: Constants.RATING_LEVELS.find(level => level.id == this.selectedRelevanceId)
    });
  }

  private loadProcesses() {
    this.catalogProcessService.listProcesses(1, 100).subscribe(
      response => {
        let processes = response['data'];
        this.processes = _.orderBy(processes, ['name']);
      }
    );
  }
  
}
