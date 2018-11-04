import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationComponent } from './organization/organization.component';
import { EditOrganizationComponent } from './organization/edit-organization/edit-organization.component';
import { AnalysisComponent } from '../components/analysis/analysis.component';
import { EditAnalysisComponent } from '../components/analysis/edit-analysis/edit-analysis.component';
import { OrganizationStructureComponent } from './organization-structure/organization-structure.component';
import { CatalogProcessService } from '../services/catalog-process.service';

const routes: Routes = [
    { path: '', component: OrganizationComponent },
    { path: ':id/edit', component: EditOrganizationComponent },
    { path: ':id/structure', component: OrganizationStructureComponent },
    { path: ':id/analyses', component: AnalysisComponent },
    { path: ':id/analyses/:analysisId/details', component: EditAnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CatalogProcessService
  ]
})
export class OrganizationsRoutingModule { }
