import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {

  @Input() paging: Paging;

  constructor() { }

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

  private getRecordCountInPage() {
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

export class Paging {
  currentPage: number = 0;
  recordsPerPage: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;
}