import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalTitle: string;

  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  Close(): void {
    this.modalRef.hide();
  }

}
