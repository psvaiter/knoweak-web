import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from '../../../shared/crud/crud.service';

@Component({
  selector: 'app-macroprocesses-lookup-modal',
  templateUrl: './macroprocesses-lookup-modal.component.html',
  styleUrls: ['./macroprocesses-lookup-modal.component.scss']
})
export class MacroprocessesLookupModalComponent implements OnInit {
  selectedMacroprocessId: number;
  macroprocesses = [];
  confirmed = new EventEmitter<number>();

  constructor(
    private _modalService: BsModalService,
    private _crudService: CrudService
  ) { }

  ngOnInit() {
    this.loadMacroprocesses();
  }
  
  Confirm(): void {
    this.confirmed.emit(this.selectedMacroprocessId);
  }

  private loadMacroprocesses(): void {
    let url = `${CrudService.BaseUrl}/macroprocesses`;

    this._crudService.get(url).subscribe(
      data => {
        this.macroprocesses = data['data'];
      },
      err => {
        console.error(err);
      }
    );
  }
}
