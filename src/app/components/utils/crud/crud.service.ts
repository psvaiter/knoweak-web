import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CrudService {

  static readonly BaseUrl: string = 'http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  get(url: string) {
    return this._http.get(url);
  }

  getPage(url: string, page: number, recordsPerPage: number) {
    let params = this.getPageRequestParams(page, recordsPerPage);
    return this._http.get(url, { params });
  }

  create(resource, url: string) {
    return this._http.post(url, resource, this.httpOptions);
  }

  patch(resource, url: string) {
    return this._http.patch(url, resource, this.httpOptions);
  }

  delete(url: string) {
    return this._http.delete(url);
  }

  private getPageRequestParams(page: number, recordsPerPage: number): HttpParams {
    let params = new HttpParams();
    
    if (page) {
      params = params.set('page', page.toString());
    }
    if (recordsPerPage) {
      params = params.set('recordsPerPage', recordsPerPage.toString());
    }
    
    return params;
  }
}
