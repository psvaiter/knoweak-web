import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from '../../../shared/crud/crud.service';
import { OrganizationDepartment } from '../../organization/organization';

@Component({
  selector: 'app-macroprocesses-lookup-modal',
  templateUrl: './macroprocesses-lookup-modal.component.html',
  styleUrls: ['./macroprocesses-lookup-modal.component.scss']
})
export class MacroprocessesLookupModalComponent implements OnInit {
  selectedMacroprocessId: number;
  department: OrganizationDepartment;
  macroprocesses = [];
  confirmed = new EventEmitter<OrganizationDepartment>();

  constructor(
    private _modalService: BsModalService,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.loadMacroprocesses();
  }
  
  Confirm(): void {
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
