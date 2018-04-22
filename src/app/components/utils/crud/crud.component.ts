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
  currentRecord = <TEntity> {};
  persistedRecord = <TEntity> {};
  hasCreated: boolean = false;
  hasUpdated: boolean = false;

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

  getSingleRecord(url: string) {
    this._crudService.get(url).subscribe(
      data => {
        this.persistedRecord = data['data'];
        this.currentRecord = Object.assign({}, this.persistedRecord);
      }, 
      err => console.error(err)
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

  patchRecord(currentRecord: TEntity, url: string): void {
    // Don't make request if record hasn't been changed
    if (!this.hasChangedRecord()) {
      return;
    }

    this._crudService.patch(this.currentRecord, url).subscribe(
      data => {
        this.persistedRecord = data['data'];
        this.currentRecord = Object.assign({}, this.persistedRecord);
        
        this.hasUpdated = true;
        this.errors = [];
      },
      err => {
        console.error(err);
        this.hasUpdated = true;
        this.errors = err['error'].errors;
      }
    );
  }

  hasChangedRecord(): boolean {
    return JSON.stringify(this.currentRecord) != JSON.stringify(this.persistedRecord);
  }

  getPrevPage() {
    this.getRecords(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.getRecords(this.paging.currentPage + 1);
  }

}
