import { Component, OnInit, EventEmitter } from '@angular/core';
import { CatalogProcessService } from '../../../../services/api/catalog/process/catalog-process.service';

@Component({
  selector: 'app-process-lookup-modal',
  templateUrl: './process-lookup-modal.component.html',
  styleUrls: ['./process-lookup-modal.component.scss']
})
export class ProcessLookupModalComponent implements OnInit {

  processes: any[];
  ratingLevels = [
    {id: 1, name: "Muito baixa"},
    {id: 2, name: "Baixa"},
    {id: 3, name: "Média"},
    {id: 4, name: "Alta"},
    {id: 5, name: "Muito alta"}
  ]

  selectedProcessId: number;
  selectedRelevanceId: number;
  confirmed = new EventEmitter();

  constructor(private catalogProcessService: CatalogProcessService) { }

  ngOnInit() {
    this.loadProcesses();
  }

  confirm() {
    this.confirmed.emit({
      processId: this.selectedProcessId,
      relevance: this.selectedRelevanceId
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
