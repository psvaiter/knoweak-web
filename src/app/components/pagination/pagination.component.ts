import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  paging: Paging;

  constructor() { }

  ngOnInit() {
  }

  getCurrentStart() {
    // Empty page
    if (this.paging.currentPage == 0 || this.paging.totalRecords == 0) {
      return 0;
    }

    // All other situations
    return ((this.paging.currentPage - 1) * this.paging.recordsPerPage) + 1;
  }

  getCurrentEnd() {
    return this.getCurrentStart() + this.getRecordCountInPage() - 1;
  }

  getRecordCountInPage() {
    let recordsInPage = this.paging.recordsPerPage;

    // Empty page
    if (this.paging.currentPage == 0 || this.paging.totalRecords == 0) {
      return 0;
    }

    // Special case for if current page is the last page
    if (this.paging.currentPage == this.paging.totalPages) {
      let remainder = this.paging.totalRecords % this.paging.recordsPerPage;
      recordsInPage = (remainder > 0) ? remainder : this.paging.recordsPerPage;
    }

    return recordsInPage;
  }
}

interface Paging {
  currentPage: number;
  recordsPerPage: number;
  totalRecords: number;
  totalPages: number;
}