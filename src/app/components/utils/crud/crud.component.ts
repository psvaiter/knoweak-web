import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { Paging } from '../../pagination/pagination.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export abstract class CrudComponent<TEntity> {
  
  readonly DefaultRecordsPerPage = 10;

  protected abstract url: string;
  records: TEntity[];
  paging: Paging = new Paging();
  errors = []
  newRecord = <TEntity> {};
  hasCreated: boolean = false;

  constructor(protected _crudService: CrudService) { }

  getRecords(page: number, recordsPerPage: number = this.DefaultRecordsPerPage) {
    this._crudService.getPage(this.url, page, recordsPerPage).subscribe(
      data => {
        this.records = data['data'];
        this.paging = Object.assign(this.paging, data['paging']);
      },
      err => {
        console.error(err);
      }
    );
  }

  createRecord(newRecord: TEntity) {
    this._crudService.create(newRecord, this.url).subscribe(
      data => {
        // Update listing
        this.getRecords(this.paging.currentPage);
        this.paging = Object.assign(this.paging, data['paging']);

        // Erase filled data
        this.newRecord = <TEntity> {};
        this.hasCreated = true;
        this.errors = [];
      },
      err => {
        console.error(err);
        this.hasCreated = false;
        this.errors = err['error'].errors;
      }
    );
  }

  getPrevPage() {
    this.getRecords(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.getRecords(this.paging.currentPage + 1);
  }

}
