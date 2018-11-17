import { NgModule } from '@angular/core';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrganizationComponent } from '../organizations/organization/organization.component';
import { EditOrganizationComponent } from '../organizations/organization/edit-organization/edit-organization.component';
import { OrganizationStructureComponent } from '../organizations/organization-structure/organization-structure.component';
import { DepartmentsLookupModalComponent } from './organization-structure/departments-lookup-modal/departments-lookup-modal.component';
import { MacroprocessLookupModalComponent } from './organization-structure/macroprocess-lookup-modal/macroprocess-lookup-modal.component';
import { DepartmentListComponent } from './organization-structure/department-list/department-list.component';
import { MacroprocessItemComponent } from './organization-structure/macroprocess-item/macroprocess-item.component';
import { ProcessLookupModalComponent } from './organization-structure/process-lookup-modal/process-lookup-modal.component';
import { DepartmentItemComponent } from './organization-structure/department-item/department-item.component';
import { AnalysisComponent } from '../../components/analysis/analysis.component';
import { AnalysisDetailComponent } from '../../components/analysis/analysis-detail/analysis-detail.component';
import { EditAnalysisComponent } from '../../components/analysis/edit-analysis/edit-analysis.component';
import { CatalogDepartmentService } from '../../services/api/catalog/department/catalog-department.service';
import { CatalogMacroprocessService } from '../../services/api/catalog/macroprocess/catalog-macroprocess.service';
import { CatalogProcessService } from '../../services/api/catalog/process/catalog-process.service';
import { OrganizationMacroprocessService } from '../../services/api/organization/organization-macroprocess.service';
import { OrganizationProcessService } from '../../services/api/organization/organization-process.service';

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
        CatalogMacroprocessService,
        CatalogProcessService,
        OrganizationMacroprocessService,
        OrganizationProcessService
    ],
})
export class OrganizationsModule { }
