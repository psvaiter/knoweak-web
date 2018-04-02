import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DepartmentService {

  baseUrl: string = 'http://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get('http://localhost:8000/departments');
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