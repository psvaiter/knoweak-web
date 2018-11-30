import { Component, OnInit, EventEmitter } from '@angular/core';
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
  
  private processes: any[];
  private ratingLevels = Constants.RATING_LEVELS;
  private editMode: boolean;

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
        this.processes = response['data'];
        this.processes.sort((a, b) => (a.name < b.name) ? -1 : 1);
      }
    );
  }
  
}
