import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CrudService } from '../../../shared/crud/crud.service';

@Component({
  selector: 'app-departments-lookup-modal',
  templateUrl: './departments-lookup-modal.component.html',
  styleUrls: ['./departments-lookup-modal.component.scss']
})
export class DepartmentsLookupModalComponent implements OnInit {
  selectedDepartmentId: number;
  departments = [];
  confirmed = new EventEmitter<number>();

  constructor(
    private _modalService: BsModalService,
    private _crudService: CrudService,
  ) { }

  ngOnInit() {
    this.loadDepartments();
  }

  Confirm(): void {
    this.confirmed.emit(this.selectedDepartmentId);
  }

  private loadDepartments(): void {
    let url = `${CrudService.BaseUrl}/departments`;

    this._crudService.get(url).subscribe(
      data => {
        this.departments = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

}
