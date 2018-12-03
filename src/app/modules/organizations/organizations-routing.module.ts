import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationStructureComponent } from './organization-structure/organization-structure.component';
import { AnalysisComponent } from '../../components/analysis/analysis.component';
import { EditAnalysisComponent } from '../../components/analysis/edit-analysis/edit-analysis.component';
import { OrganizationSecurityThreatsComponent } from './organization-security-threats/organization-security-threats.component';
import { OrganizationItAssetsComponent } from './organization-it-assets/organization-it-assets.component';
import { OrganizationItAssetVulnerabilitiesComponent } from './organization-it-asset-vulnerabilities/organization-it-asset-vulnerabilities.component';

const routes: Routes = [
    { path: '', component: OrganizationListComponent },
    { path: ':id/details', component: OrganizationDetailsComponent },
    { path: ':id/structure', component: OrganizationStructureComponent },
    { path: ':id/securityThreats', component: OrganizationSecurityThreatsComponent },
    { path: ':id/itAssets', component: OrganizationItAssetsComponent },
    { path: ':id/itAssets/:instanceId/vulnerabilities', component: OrganizationItAssetVulnerabilitiesComponent },
    { path: ':id/analyses', component: AnalysisComponent },
    { path: ':id/analyses/:analysisId/details', component: EditAnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class OrganizationsRoutingModule { }
