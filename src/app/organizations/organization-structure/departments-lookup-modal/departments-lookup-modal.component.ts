import { Component, OnInit, EventEmitter } from '@angular/core';
import { CrudService } from '../../../shared/components/crud/crud.service';

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
      response => {
        this.departments = response['data'];
      },
      err => {
        console.error(err);
      }
    );
  }
}
