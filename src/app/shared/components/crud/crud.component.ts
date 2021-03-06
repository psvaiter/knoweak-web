import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CrudService } from './crud.service';
import { Paging } from '../pagination/pagination.component';
import { Utils } from '../../utils';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent<TEntity> {
  
  readonly DefaultRecordsPerPage = 10;

  protected url: string;
  records: TEntity[];
  paging: Paging = new Paging();
  errors = [];
  newRecord = <TEntity> {};
  currentRecord = <TEntity> {};
  persistedRecord = <TEntity> {};
  hasCreated: boolean = false;
  hasUpdated: boolean = false;
  loading: boolean = false;
  persisting: boolean = false;
  fieldLabels: Map<string, string>;

  constructor(protected _crudService: CrudService) { }

  getRecords(page: number, recordsPerPage: number = this.DefaultRecordsPerPage) {
    this.loading = true;
    this.records = [];

    this._crudService.getPage(this.url, page, recordsPerPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
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
    this.loading = true;
    this._crudService.get(url).subscribe(
      data => {
        this.loading = false;
        this.persistedRecord = data['data'];
        this.currentRecord = Object.assign({}, this.persistedRecord);
      }, 
      err => {
        this.loading = false;
        console.error(err)
      }
    );
  }

  createRecord(newRecord: TEntity) {
    this.hasCreated = false;
    this.persisting = true;
    this.errors = [];

    this._crudService.post(this.url, newRecord)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        data => {
          // Update listing
          this.getRecords(this.paging.currentPage);

          // Erase filled data
          this.newRecord = <TEntity> {};
          this.hasCreated = true;
        },
        err => {
          this.hasCreated = false;
          this.errors = Utils.getErrors(err, this.fieldLabels);
        }
      );
  }

  patchRecord(url: string): void {
    this.hasUpdated = false;
    this.persisting = true;
    this.errors = [];

    let patchRequestBody = this.buildPatchRequestBody();

    this._crudService.patch(url, patchRequestBody)
      .pipe(finalize(() => this.persisting = false))
      .subscribe(
        data => {
          this.persistedRecord = data['data'];
          this.currentRecord = Object.assign({}, this.persistedRecord);
          
          this.hasUpdated = true;
        },
        err => {
          this.hasUpdated = false;
          this.errors = Utils.getErrors(err, this.fieldLabels);
        }
      );
  }

  hasChangedRecord(): boolean {
    return JSON.stringify(this.currentRecord) != JSON.stringify(this.persistedRecord);
  }

  buildPatchRequestBody() {
    let patchRequestBody: any = {};

    for (const key in this.currentRecord) {

      let value = this.currentRecord[key];

      // Extract value if changed
      // Set null when value is an empty string
      if (value != this.persistedRecord[key]) {
        
        if (typeof value === "string" && !value) {
          patchRequestBody[key] = null;
        }
        else {
          patchRequestBody[key] = value;
        }
      }
    }

    return patchRequestBody;
  }
  
  getPrevPage() {
    this.getRecords(this.paging.currentPage - 1);
  }

  getNextPage() {
    this.getRecords(this.paging.currentPage + 1);
  }

}
