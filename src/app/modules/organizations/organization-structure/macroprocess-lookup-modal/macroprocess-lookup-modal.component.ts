import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrganizationDepartment } from '../../organization';
import { CatalogMacroprocessService } from '../../../../services/api/catalog/macroprocess/catalog-macroprocess.service';
import { OrganizationMacroprocessService } from '../../../../services/api/organization/organization-macroprocess.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-macroprocess-lookup-modal',
  templateUrl: './macroprocess-lookup-modal.component.html',
  styleUrls: ['./macroprocess-lookup-modal.component.scss']
})
export class MacroprocessLookupModalComponent implements OnInit {

  @Input() organizationId: number;
  @Input() department: OrganizationDepartment;
  @Output() added: EventEmitter<void> = new EventEmitter<void>();

  selectedMacroprocessId: number;
  macroprocesses = [];
  errors: any[];

  constructor(
    private catalogMacroprocessService: CatalogMacroprocessService,
    private organizationMacroprocessService: OrganizationMacroprocessService
  ) {

  }

  ngOnInit() {
    this.loadMacroprocesses();
  }
  
  confirm(): void {
    this.errors = null;
    this.addMacroprocess(this.selectedMacroprocessId);
  }

  private loadMacroprocesses(): void {
    this.catalogMacroprocessService.listMacroprocesses(1, 100).subscribe(
      response => {
        this.macroprocesses = response['data'];
      },
      err => {
        console.error(err);
      }
    );
  }

  private addMacroprocess(macroprocessId: number) {
    let request = {
      departmentId: this.department.id,
      macroprocessId: macroprocessId
    };
    this.organizationMacroprocessService.add(this.organizationId, request)
      .subscribe(
        response => {
          this.added.emit();
        },
        err => {
          this.errors = Utils.getErrors(err);
        }
      );
  }

}
