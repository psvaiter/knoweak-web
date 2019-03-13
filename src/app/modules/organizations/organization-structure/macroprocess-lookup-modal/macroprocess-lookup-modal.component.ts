import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

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

  selectedMacroprocess: any;
  macroprocesses = [];

  loading: boolean;
  persisting: boolean;
  errors: any[];

  fieldLabels = new Map([
    ["departmentId", "Departamento"],
    ["macroprocessId", "Macroprocesso"],
    ["name", "Macroprocesso"],
    ["departmentId/macroprocessId", "Departamento + Macroprocesso"]
  ]);

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
    this.persisting = true;

    this.addToCatalogIfNotExist(this.selectedMacroprocess)
      .then((macroprocess => this.addToOrganization(macroprocess)))
      .then(() => this.added.emit())
      .catch(err => this.errors = Utils.getErrors(err, this.fieldLabels))
      .then(() => this.persisting = false);
  }
  
  addNewOption(name: string) {
    return { name: name };
  }

  private loadMacroprocesses(): void {
    this.loading = true;

    this.catalogMacroprocessService.listMacroprocesses(1, 100)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        response => {
          this.macroprocesses = response['data'];
        },
        err => {
          console.error(err);
        }
      );
  }

  private addToOrganization(macroprocess: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      let request = {
        departmentId: this.department.id,
        macroprocessId: macroprocess.id
      };
      this.organizationMacroprocessService.add(this.organizationId, request)
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );

    });
  }

  private addToCatalogIfNotExist(macroprocess): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (this.isAlreadyInCatalog(macroprocess)) {
        return resolve(macroprocess);
      }

      this.catalogMacroprocessService.addMacroprocess({ name: macroprocess.name })
        .subscribe(
          response => resolve(response['data']),
          err => reject(err)
        );

    });
  }

  private isAlreadyInCatalog(item) {
    return item && item.id;
  }

}
