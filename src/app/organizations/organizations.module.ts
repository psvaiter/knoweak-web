import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgSelectModule } from '@ng-select/ng-select';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationComponent } from '../organizations/organization/organization.component';
import { EditOrganizationComponent } from '../organizations/organization/edit-organization/edit-organization.component';
import { OrganizationStructureComponent } from '../organizations/organization/organization-structure/organization-structure.component';
import { AnalysisComponent } from '../components/analysis/analysis.component';
import { AnalysisDetailComponent } from '../components/analysis/analysis-detail/analysis-detail.component';
import { EditAnalysisComponent } from '../components/analysis/edit-analysis/edit-analysis.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        OrganizationsRoutingModule,
        AngularFontAwesomeModule,
        NgSelectModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        OrganizationComponent,
        EditOrganizationComponent,
        OrganizationStructureComponent,
        AnalysisComponent,
        AnalysisDetailComponent,
        EditAnalysisComponent,
    ],
    providers: [],
})
export class OrganizationsModule { }
