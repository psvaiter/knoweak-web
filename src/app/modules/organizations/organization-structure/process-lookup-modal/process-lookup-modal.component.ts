import { Component, OnInit, EventEmitter } from '@angular/core';
import { CatalogProcessService } from '../../../../services/api/catalog/process/catalog-process.service';

@Component({
  selector: 'app-process-lookup-modal',
  templateUrl: './process-lookup-modal.component.html',
  styleUrls: ['./process-lookup-modal.component.scss']
})
export class ProcessLookupModalComponent implements OnInit {

  processes: any[];
  selectedProcess: any;
  confirmed = new EventEmitter();

  constructor(private catalogProcessService: CatalogProcessService) { }

  ngOnInit() {
    this.loadProcesses();
  }

  confirm() {
    this.confirmed.emit(this.selectedProcess);
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
