import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CrudService {

  static readonly BaseUrl: string = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  get(url: string) {
    return this._http.get(url);
  }

  getPage(url: string, page: number, recordsPerPage: number, filters: object = null) {
    let params = this.getPageRequestParams(page, recordsPerPage);
    
    if (filters) {
      for (let key in filters) {
        params = params.append(key, filters[key]);
      }
    }
    
    return this._http.get(url, { params });
  }

  post(url: string, data: any) {
    return this._http.post(url, data, this.httpOptions);
  }

  patch(url: string, data: any) {
    return this._http.patch(url, data, this.httpOptions);
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
