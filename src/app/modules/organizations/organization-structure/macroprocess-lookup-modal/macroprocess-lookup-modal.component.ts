import { Component, OnInit, EventEmitter } from '@angular/core';
import { OrganizationDepartment } from '../../organization';
import { CatalogMacroprocessService } from '../../../../services/api/catalog/macroprocess/catalog-macroprocess.service';

@Component({
  selector: 'app-macroprocess-lookup-modal',
  templateUrl: './macroprocess-lookup-modal.component.html',
  styleUrls: ['./macroprocess-lookup-modal.component.scss']
})
export class MacroprocessLookupModalComponent implements OnInit {

  selectedMacroprocessId: number;
  department: OrganizationDepartment;
  macroprocesses = [];
  confirmed = new EventEmitter<number>();

  constructor(private catalogMacroprocessService: CatalogMacroprocessService) { }

  ngOnInit() {
    this.loadMacroprocesses();
  }
  
  confirm(): void {
    this.confirmed.emit(this.selectedMacroprocessId);
  }

  private loadMacroprocesses(): void {
    this.catalogMacroprocessService.listMacroprocesses(1, 100).subscribe(
      response => {
        this.macroprocesses = response['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

}
