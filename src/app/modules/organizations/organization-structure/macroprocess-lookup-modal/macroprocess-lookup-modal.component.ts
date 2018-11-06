import { Component, OnInit, EventEmitter } from '@angular/core';
import { OrganizationDepartment } from '../../organization/organization';
import { CrudService } from '../../../../shared/components/crud/crud.service';

@Component({
  selector: 'app-macroprocess-lookup-modal',
  templateUrl: './macroprocess-lookup-modal.component.html',
  styleUrls: ['./macroprocess-lookup-modal.component.scss']
})
export class MacroprocessLookupModalComponent implements OnInit {

  selectedMacroprocessId: number;
  department: OrganizationDepartment;
  macroprocesses = [];
  confirmed = new EventEmitter<OrganizationDepartment>();

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.loadMacroprocesses();
  }
  
  confirm(): void {
    this.department.selectedMacroprocessId = this.selectedMacroprocessId;
    this.confirmed.emit(this.department);
  }

  private loadMacroprocesses(): void {
    let url = `${CrudService.BaseUrl}/macroprocesses`;

    this.crudService.get(url).subscribe(
      data => {
        this.macroprocesses = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }
}
