import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { Paging } from '../../pagination/pagination.component';
import { finalize } from 'rxjs/operators';

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

  constructor(protected _crudService: CrudService) { }

  getRecords(page: number, recordsPerPage: number = this.DefaultRecordsPerPage) {
    this.loading = true;
    this._crudService.getPage(this.url, page, recordsPerPage)
    .pipe(finalize(() => {this.loading = false;}))
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
    this.loading = true;
    this._crudService.post(newRecord, this.url).subscribe(
      data => {
        this.loading = false;

        // Update listing
        this.getRecords(this.paging.currentPage);
        this.paging = Object.assign(this.paging, data['paging']);

        // Erase filled data
        this.newRecord = <TEntity> {};
        this.hasCreated = true;
        this.errors = [];
      },
      err => {
        this.loading = false;
        this.hasCreated = false;
        
        console.error(err);
        this.errors = err['error'].errors;
        if (!this.errors) {
          this.errors = [{
            message: JSON.stringify(err['error'])
          }];
        }
      }
    );
  }

  patchRecord(url: string): void {
    this.loading = true;
    
    let patchRequestBody = this.buildPatchRequestBody();

    this._crudService.patch(patchRequestBody, url).subscribe(
      data => {
        this.loading = false;
        this.persistedRecord = data['data'];
        this.currentRecord = Object.assign({}, this.persistedRecord);
        
        this.hasUpdated = true;
        this.errors = [];
      },
      err => {
        this.loading = false;
        this.hasUpdated = true;
        
        console.error(err);
        this.errors = err['error'].errors;
        if (!this.errors) {
          this.errors = [{
            message: JSON.stringify(err['error'])
          }];
        }
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
          patchRequestBody[key] = this.currentRecord[key];
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
