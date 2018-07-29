import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getUserName() : string {
    return localStorage.getItem('name');
  }

  getExpirationIsoDate() : string {
    return localStorage.getItem('expires_at');
  }
}
