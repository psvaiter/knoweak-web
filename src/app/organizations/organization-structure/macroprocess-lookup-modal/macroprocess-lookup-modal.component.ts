import { Component, OnInit, EventEmitter } from '@angular/core';
import { CrudService } from '../../../shared/crud/crud.service';
import { OrganizationDepartment } from '../../organization/organization';

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
