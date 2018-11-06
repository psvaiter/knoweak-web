import { NgModule } from '@angular/core';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationComponent } from '../organizations/organization/organization.component';
import { EditOrganizationComponent } from '../organizations/organization/edit-organization/edit-organization.component';
import { OrganizationStructureComponent } from '../organizations/organization-structure/organization-structure.component';
import { AnalysisComponent } from '../components/analysis/analysis.component';
import { AnalysisDetailComponent } from '../components/analysis/analysis-detail/analysis-detail.component';
import { EditAnalysisComponent } from '../components/analysis/edit-analysis/edit-analysis.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsLookupModalComponent } from './organization-structure/departments-lookup-modal/departments-lookup-modal.component';
import { MacroprocessLookupModalComponent } from './organization-structure/macroprocess-lookup-modal/macroprocess-lookup-modal.component';
import { DepartmentListComponent } from './organization-structure/department-list/department-list.component';
import { MacroprocessListComponent } from './organization-structure/macroprocess-list/macroprocess-list.component';
import { MacroprocessItemComponent } from './organization-structure/macroprocess-item/macroprocess-item.component';
import { ProcessLookupModalComponent } from './organization-structure/process-lookup-modal/process-lookup-modal.component';
import { OrganizationProcessService } from '../services/api/organization/organization-process.service';
import { DepartmentItemComponent } from './organization-structure/department-item/department-item.component';
import { OrganizationMacroprocessService } from '../services/api/organization/organization-macroprocess.service';
import { CatalogDepartmentService } from '../services/api/catalog/department/catalog-department.service';

@NgModule({
    declarations: [
        OrganizationComponent,
        EditOrganizationComponent,
        OrganizationStructureComponent,
        AnalysisComponent,
        AnalysisDetailComponent,
        EditAnalysisComponent,
        DepartmentsLookupModalComponent,
        MacroprocessLookupModalComponent,
        DepartmentListComponent,
        MacroprocessListComponent,
        MacroprocessItemComponent,
        ProcessLookupModalComponent,
        DepartmentItemComponent,
    ],
    entryComponents: [
        DepartmentsLookupModalComponent,
        MacroprocessLookupModalComponent,
        ProcessLookupModalComponent
    ],
    imports: [
        OrganizationsRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [
        CatalogDepartmentService,
        OrganizationMacroprocessService,
        OrganizationProcessService
    ],
})
export class OrganizationsModule { }
