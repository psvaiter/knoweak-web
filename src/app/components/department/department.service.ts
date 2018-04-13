import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DepartmentService {

  baseUrl: string = 'http://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  getAll(page?: number, recordsPerPage?: number) {

    let url = this.baseUrl + '/departments';
    let params = this.GetPageRequestParams(page, recordsPerPage);
    
    return this._http.get(url, { params });
  }

  private GetPageRequestParams(page: number, recordsPerPage: number): HttpParams {
    let params = new HttpParams();
    
    if (page) {
      params = params.set('page', page.toString());
    }
    if (recordsPerPage) {
      params = params.set('recordsPerPage', recordsPerPage.toString());
    }
    
    return params;
  }

  getById(id: number) {
    return this._http.get(this.baseUrl + '/departments/' + id);
  }

  create(department: Department) {
    let body = JSON.stringify(department);
    let url = this.baseUrl + '/departments';
    return this._http.post(url, body, this.httpOptions);
  }

  patch(department: Department) {
    let body = JSON.stringify(department);
    let url = this.baseUrl + '/departments/' + department.id;
    return this._http.patch(url, body, this.httpOptions);
  }
}

export class Department {
  id: number;
  name: string;
  createdOn: DateTimeFormat;
  lastModifiedOn: DateTimeFormat;
}