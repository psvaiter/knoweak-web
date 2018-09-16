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

@NgModule({
    declarations: [
        OrganizationComponent,
        EditOrganizationComponent,
        OrganizationStructureComponent,
        AnalysisComponent,
        AnalysisDetailComponent,
        EditAnalysisComponent,
        DepartmentsLookupModalComponent,
    ],
    entryComponents: [
        DepartmentsLookupModalComponent
    ],
    imports: [
        OrganizationsRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [],
})
export class OrganizationsModule { }
